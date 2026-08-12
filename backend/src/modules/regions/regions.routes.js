const express = require('express');
const { body } = require('express-validator');
const db = require('../../../models');
const { authenticate } = require('../../middleware/auth');
const { requireRole } = require('../../middleware/rbac');
const { validate } = require('../../middleware/errorHandler');

const router = express.Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const regions = await db.region.findAll({ order: [['name', 'ASC']] });
    res.json({ data: regions });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const region = await db.region.findByPk(req.params.id);
    if (!region) return res.status(404).json({ error: 'Region not found' });
    res.json(region);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  authenticate,
  requireRole('administrator'),
  [body('name').trim().notEmpty().isLength({ max: 150 })],
  validate,
  async (req, res, next) => {
    try {
      const region = await db.region.create({ name: req.body.name, country: req.body.country || 'Tanzania' });
      res.status(201).json(region);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
