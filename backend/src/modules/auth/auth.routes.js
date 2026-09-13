const express = require('express');
const { body } = require('express-validator');
const controller = require('./auth.controller');
const { validate } = require('../../middleware/errorHandler');
const { authenticate } = require('../../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [
    body('firstName').trim().notEmpty().isLength({ max: 100 }),
    body('lastName').trim().notEmpty().isLength({ max: 100 }),
    body('email').trim().isEmail().normalizeEmail(),
    body('phoneNumber').optional({ nullable: true }).trim().isLength({ max: 30 }),
    body('password')
      .isLength({ min: 10 })
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/[0-9]/)
      .matches(/[^a-zA-Z0-9]/)
      .withMessage('Password must be at least 10 characters and include upper, lower, number, and symbol')
  ],
  validate,
  controller.register
);

router.post(
  '/login',
  [body('email').trim().isEmail().normalizeEmail(), body('password').isString().notEmpty()],
  validate,
  controller.login
);

router.post('/refresh', [body('refreshToken').isString().notEmpty()], validate, controller.refresh);

router.post('/logout', [body('refreshToken').isString().notEmpty()], validate, controller.logout);

router.get('/me', authenticate, controller.me);

module.exports = router;
