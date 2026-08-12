const express = require('express');
const { body } = require('express-validator');
const db = require('../../../models');
const { authenticate } = require('../../middleware/auth');
const { requireRole } = require('../../middleware/rbac');
const { validate } = require('../../middleware/errorHandler');

const router = express.Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const where = req.query.regionId ? { region_id: req.query.regionId } : {};
    const districts = await db.district.findAll({ where, order: [['name', 'ASC']] });
    res.json({ data: districts });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  authenticate,
  requireRole('administrator'),
  [body('name').trim().notEmpty().isLength({ max: 150 }), body('regionId').isInt({ min: 1 })],
  validate,
  async (req, res, next) => {
    try {
      const district = await db.district.create({ name: req.body.name, region_id: req.body.regionId });
      res.status(201).json(district);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
