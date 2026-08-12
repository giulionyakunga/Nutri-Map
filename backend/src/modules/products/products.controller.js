const service = require('./products.service');
const { getPagination } = require('../../utils/pagination');

async function list(req, res, next) {
  try {
    const { page, limit, offset } = getPagination(req.query);
    res.json(await service.list({ page, limit, offset, producerId: req.query.producerId }));
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const product = await service.getById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const product = await service.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const product = await service.update(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const ok = await service.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, update, remove };
