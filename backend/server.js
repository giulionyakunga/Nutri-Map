require('dotenv').config();

const REQUIRED_ENV = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const app = require('./src/app');
const logger = require('./src/utils/logger');
const db = require('./models');

const PORT = process.env.PORT || 4000;

db.sequelize
  .authenticate()
  .then(() => {
    logger.info('Database connection established');
    app.listen(PORT, () => {
      logger.info(`Nutri-Map API listening on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
    });
  })
  .catch((err) => {
    logger.error('Unable to connect to the database', { error: err.message });
    process.exit(1);
  });

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection', { reason: String(reason) });
});
