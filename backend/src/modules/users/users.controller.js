const service = require('./users.service');
const { getPagination } = require('../../utils/pagination');

async function list(req, res, next) {
  try {
    const { page, limit, offset } = getPagination(req.query);
    res.json(await service.list({ page, limit, offset, status: req.query.status }));
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const user = await service.getById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function changeRole(req, res, next) {
  try {
    const user = await service.changeRole(req.params.id, req.body.roleId, req.user.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function changeStatus(req, res, next) {
  try {
    const user = await service.changeStatus(req.params.id, req.body.status, req.user.sub);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, changeRole, changeStatus };
