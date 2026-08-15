const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array().map((e) => ({ field: e.path, message: e.msg })) });
  }
  return next();
}

function errorHandler(err, req, res, _next) {
  logger.error(err.message, { path: req.path, method: req.method });

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'Duplicate record', fields: err.errors.map((e) => e.path) });
  }
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(409).json({ error: 'Referenced record does not exist' });
  }
  if (err.name === 'SequelizeValidationError') {
    return res.status(422).json({ errors: err.errors.map((e) => ({ field: e.path, message: e.message })) });
  }

  const status = err.status || 500;
  const message = status < 500 ? err.publicMessage || err.message : 'Internal server error';
  return res.status(status).json({ error: message });
}

function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

module.exports = { validate, errorHandler, notFound };
