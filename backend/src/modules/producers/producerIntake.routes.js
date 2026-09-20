const express = require('express');
const { body } = require('express-validator');
const db = require('../../../models');
const service = require('./producers.service');
const { validate } = require('../../middleware/errorHandler');

const router = express.Router();

function requiredString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function locationReference(value) {
  return Number.isInteger(value) || requiredString(value);
}

async function findByIdOrName(model, value, where = {}) {
  if (Number.isInteger(value)) {
    return model.findOne({ where: { ...where, id: value } });
  }
  return model.findOne({
    where: { ...where, name: db.sequelize.where(db.sequelize.fn('LOWER', db.sequelize.col('name')), value.trim().toLowerCase()) }
  });
}

router.post(
  '/',
  [
    body('business_name').custom(requiredString).withMessage('business_name is required').isLength({ max: 255 }),
    body('physical_address').custom(requiredString).withMessage('physical_address is required').isLength({ max: 500 }),
    body('region').custom(locationReference).withMessage('region is required'),
    body('district').optional({ nullable: true }).custom(locationReference),
    body('ward').optional({ nullable: true }).custom(locationReference),
    body('latitude').isFloat({ min: -90, max: 90 }),
    body('longitude').isFloat({ min: -180, max: 180 }),
    body('phone').optional({ nullable: true }).isString().isLength({ max: 30 }),
    body('registration_type').optional({ nullable: true }).isIn(['formal', 'informal'])
  ],
  validate,
  async (req, res, next) => {
    try {
      const input = req.body;
      const region = await findByIdOrName(db.region, input.region);
      if (!region) return res.status(422).json({ error: 'Region not found' });

      let district;
      if (input.district !== undefined && input.district !== null && input.district !== '') {
        district = await findByIdOrName(db.district, input.district, { region_id: region.id });
        if (!district) return res.status(422).json({ error: 'District not found in selected region' });
      }

      let ward;
      if (input.ward !== undefined && input.ward !== null && input.ward !== '') {
        if (!district) return res.status(422).json({ error: 'District is required when ward is provided' });
        ward = await findByIdOrName(db.ward, input.ward, { district_id: district.id });
        if (!ward) return res.status(422).json({ error: 'Ward not found in selected district' });
      }

      const producer = await service.createFromForm(input, {
        regionId: region.id,
        districtId: district ? district.id : null,
        wardId: ward ? ward.id : null
      });
      return res.status(201).json(producer);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;