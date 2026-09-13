const db = require('../../../models');
const { buildPaginatedResponse } = require('../../utils/pagination');
const { revokeAllSessions } = require('../auth/auth.service');

async function list({ page, limit, offset, status }) {
  const where = status ? { status } : {};
  const { rows, count } = await db.user.findAndCountAll({
    where,
    limit,
    offset,
    order: [['created_at', 'DESC']],
    include: [{ model: db.role, attributes: ['id', 'name'] }]
  });
  return buildPaginatedResponse(rows, count, page, limit);
}

async function getById(id) {
  return db.user.findByPk(id, { include: [{ model: db.role, attributes: ['id', 'name'] }] });
}

async function changeRole(targetUserId, roleId, actingAdminId) {
  if (Number(targetUserId) === Number(actingAdminId)) {
    const err = new Error('Administrators cannot change their own role');
    err.status = 400;
    throw err;
  }

  const role = await db.role.findByPk(roleId);
  if (!role) {
    const err = new Error('Role not found');
    err.status = 404;
    throw err;
  }

  const user = await db.user.findByPk(targetUserId);
  if (!user) return null;

  await user.update({ role_id: roleId });
  return getById(targetUserId);
}

async function changeStatus(targetUserId, status, actingAdminId) {
  if (Number(targetUserId) === Number(actingAdminId) && status !== 'active') {
    const err = new Error('Administrators cannot deactivate their own account');
    err.status = 400;
    throw err;
  }

  const user = await db.user.findByPk(targetUserId);
  if (!user) return null;

  await user.update({ status });
  if (status !== 'active') {
    await revokeAllSessions(targetUserId);
  }

  return getById(targetUserId);
}

module.exports = { list, getById, changeRole, changeStatus };
