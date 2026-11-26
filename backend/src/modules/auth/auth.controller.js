const authService = require('./auth.service');

function requestMeta(req) {
  return { userAgent: req.headers['user-agent'], ip: req.ip };
}

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function login2(req, res, next) {
  try {
    console.log(" Login 2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ")
    const result = {
      login: "get successful"
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    console.log("req.body : ", req.body)
    const { email, password } = req.body;
    const result = await authService.login(email, password, requestMeta(req));

    console.log("result : ", result)
    
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken, requestMeta(req));
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({ user: req.user });
}

module.exports = { register, login, login2, refresh, logout, me };
