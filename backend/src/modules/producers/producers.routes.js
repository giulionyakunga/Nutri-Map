const express = require('express');
const { body, param } = require('express-validator');
const controller = require('./producers.controller');
const { authenticate } = require('../../middleware/auth');
const { requireRole } = require('../../middleware/rbac');
const { validate } = require('../../middleware/errorHandler');

const router = express.Router();
const WRITE_ROLES = ['administrator', 'data_analyst', 'enumerator'];

router.get('/', controller.list);
router.get('/geojson', controller.geojson);
router.get('/:id', param('id').isInt(), validate, controller.getOne);
router.get('/:id/profile', param('id').isInt(), validate, controller.getProfile);

router.post(
  '/',
  authenticate,
  requireRole(...WRITE_ROLES),
  [
    body('registrationType').optional({ nullable: true }).isIn(['formal', 'informal']),
    body('businessName').trim().notEmpty().isLength({ max: 255 }),
    body('physicalAddress').trim().notEmpty().isLength({ max: 500 }),
    body('regionId').isInt({ min: 1 }),
    body('districtId').optional({ nullable: true }).isInt({ min: 1 }),
    body('wardId').optional({ nullable: true }).isInt({ min: 1 }),
    body('latitude').isFloat({ min: -90, max: 90 }),
    body('longitude').isFloat({ min: -180, max: 180 }),
    body('productionCapacity').optional({ nullable: true }).isInt({ min: 0 }),
    body('dailyOutput').optional({ nullable: true }).isInt({ min: 0 }),
    body('numberOfEmployees').optional({ nullable: true }).isInt({ min: 0 }),
    body('email').optional({ nullable: true }).isEmail(),
    body('phone').optional({ nullable: true }).isString().isLength({ max: 30 })
  ],
  validate,
  controller.create
);

router.put(
  '/:id',
  authenticate,
  requireRole(...WRITE_ROLES),
  [
    param('id').isInt(),
    body('latitude').optional().isFloat({ min: -90, max: 90 }),
    body('longitude').optional().isFloat({ min: -180, max: 180 }),
    body('email').optional({ nullable: true }).isEmail()
  ],
  validate,
  controller.update
);

router.delete('/:id', authenticate, requireRole('administrator'), param('id').isInt(), validate, controller.remove);

module.exports = router;
