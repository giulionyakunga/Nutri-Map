const express = require('express');

const router = express.Router();

router.use('/auth', require('../modules/auth/auth.routes'));
router.use('/users', require('../modules/users/users.routes'));
router.use('/producers', require('../modules/producers/producers.routes'));
router.use('/products', require('../modules/products/products.routes'));
router.use('/regions', require('../modules/regions/regions.routes'));
router.use('/districts', require('../modules/districts/districts.routes'));
router.use('/wards', require('../modules/wards/wards.routes'));

router.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

module.exports = router;
