const express = require('express');
const { body } = require('express-validator');
const db = require('../../../models');
const { authenticate } = require('../../middleware/auth');
const { requireRole } = require('../../middleware/rbac');
const { validate } = require('../../middleware/errorHandler');

const router = express.Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const where = req.query.districtId ? { district_id: req.query.districtId } : {};
    const wards = await db.ward.findAll({ where, order: [['name', 'ASC']] });
    res.json({ data: wards });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  authenticate,
  requireRole('administrator'),
  [body('name').trim().notEmpty().isLength({ max: 150 }), body('districtId').isInt({ min: 1 })],
  validate,
  async (req, res, next) => {
    try {
      const ward = await db.ward.create({ name: req.body.name, district_id: req.body.districtId });
      res.status(201).json(ward);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
