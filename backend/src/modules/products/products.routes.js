const express = require('express');
const { body, param } = require('express-validator');
const controller = require('./products.controller');
const { authenticate } = require('../../middleware/auth');
const { requireRole } = require('../../middleware/rbac');
const { validate } = require('../../middleware/errorHandler');

const router = express.Router();
const WRITE_ROLES = ['administrator', 'data_analyst', 'enumerator'];

router.get('/', authenticate, controller.list);
router.get('/:id', authenticate, param('id').isInt(), validate, controller.getOne);

router.post(
  '/',
  authenticate,
  requireRole(...WRITE_ROLES),
  [
    body('producerId').isInt({ min: 1 }),
    body('productName').trim().notEmpty().isLength({ max: 255 }),
    body('pricePerUnit').optional({ nullable: true }).isFloat({ min: 0 })
  ],
  validate,
  controller.create
);

router.put(
  '/:id',
  authenticate,
  requireRole(...WRITE_ROLES),
  [param('id').isInt(), body('pricePerUnit').optional({ nullable: true }).isFloat({ min: 0 })],
  validate,
  controller.update
);

router.delete('/:id', authenticate, requireRole('administrator'), param('id').isInt(), validate, controller.remove);

module.exports = router;
