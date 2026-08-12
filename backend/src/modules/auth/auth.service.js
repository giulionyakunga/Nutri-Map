const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Op } = require('sequelize');
const db = require('../../../models');

const MAX_ATTEMPTS = Number(process.env.LOGIN_MAX_ATTEMPTS || 5);
const LOCKOUT_MINUTES = Number(process.env.LOGIN_LOCKOUT_MINUTES || 15);

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role ? user.role.name : null },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );
}

function signRefreshToken(user) {
  return jwt.sign({ sub: user.id, type: 'refresh', jti: crypto.randomUUID() }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  });
}

async function persistRefreshToken(userId, rawToken, meta) {
  const decoded = jwt.decode(rawToken);
  await db.refresh_token.create({
    user_id: userId,
    token_hash: hashToken(rawToken),
    expires_at: new Date(decoded.exp * 1000),
    user_agent: meta.userAgent || null,
    ip_address: meta.ip || null
  });
}

async function findUserWithRole(email) {
  return db.user.scope('withPassword').findOne({
    where: { email },
    include: [{ model: db.role }]
  });
}

async function register({ firstName, middleName, lastName, email, phoneNumber, password, roleId }) {
  const passwordHash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS || 12));
  const user = await db.user.create({
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
    password_hash: passwordHash,
    role_id: roleId,
    status: 'pending_activation'
  });
  return { id: user.id, email: user.email, status: user.status };
}

async function login(email, password, meta) {
  const user = await findUserWithRole(email);

  if (!user) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  if (user.locked_until && user.locked_until > new Date()) {
    const err = new Error('Account temporarily locked due to repeated failed login attempts');
    err.status = 423;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    const attempts = user.failed_login_attempts + 1;
    const update = { failed_login_attempts: attempts };
    if (attempts >= MAX_ATTEMPTS) {
      update.locked_until = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
      update.failed_login_attempts = 0;
    }
    await user.update(update);
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  if (user.status !== 'active') {
    const err = new Error(`Account is ${user.status}`);
    err.status = 403;
    throw err;
  }

  await user.update({ failed_login_attempts: 0, locked_until: null, last_login_at: new Date() });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  await persistRefreshToken(user.id, refreshToken, meta);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role ? user.role.name : null,
      status: user.status
    }
  };
}

async function refresh(rawToken, meta) {
  let payload;
  try {
    payload = jwt.verify(rawToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    const e = new Error('Invalid or expired refresh token');
    e.status = 401;
    throw e;
  }

  const tokenHash = hashToken(rawToken);
  const stored = await db.refresh_token.findOne({ where: { token_hash: tokenHash } });

  if (!stored || stored.revoked_at || stored.expires_at < new Date()) {
    const e = new Error('Refresh token is no longer valid');
    e.status = 401;
    throw e;
  }

  await stored.update({ revoked_at: new Date() });

  const user = await db.user.findByPk(payload.sub, { include: [{ model: db.role }] });
  if (!user || user.status !== 'active') {
    const e = new Error('User no longer active');
    e.status = 401;
    throw e;
  }

  const accessToken = signAccessToken(user);
  const newRefreshToken = signRefreshToken(user);
  await persistRefreshToken(user.id, newRefreshToken, meta);

  return { accessToken, refreshToken: newRefreshToken };
}

async function logout(rawToken) {
  const tokenHash = hashToken(rawToken);
  await db.refresh_token.update({ revoked_at: new Date() }, { where: { token_hash: tokenHash, revoked_at: null } });
}

async function revokeAllSessions(userId) {
  await db.refresh_token.update(
    { revoked_at: new Date() },
    { where: { user_id: userId, revoked_at: null, expires_at: { [Op.gt]: new Date() } } }
  );
}

module.exports = { register, login, refresh, logout, revokeAllSessions };
