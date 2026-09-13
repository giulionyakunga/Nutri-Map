const express = require('express');
const { body, param } = require('express-validator');
const controller = require('./users.controller');
const { authenticate } = require('../../middleware/auth');
const { requireRole } = require('../../middleware/rbac');
const { validate } = require('../../middleware/errorHandler');

const router = express.Router();

router.use(authenticate);
router.use(requireRole('administrator'));

router.get('/', controller.list);
router.get('/:id', param('id').isInt(), validate, controller.getOne);
router.patch(
  '/:id/role',
  [param('id').isInt(), body('roleId').isInt({ min: 1 })],
  validate,
  controller.changeRole
);
router.patch(
  '/:id/status',
  [param('id').isInt(), body('status').isIn(['active', 'suspended', 'inactive'])],
  validate,
  controller.changeStatus
);

module.exports = router;
