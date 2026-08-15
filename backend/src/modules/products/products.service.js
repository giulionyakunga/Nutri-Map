const db = require('../../../models');
const { buildPaginatedResponse } = require('../../utils/pagination');

async function list({ page, limit, offset, producerId }) {
  const where = {};
  if (producerId) where.producer_id = producerId;

  const { rows, count } = await db.product.findAndCountAll({
    where,
    limit,
    offset,
    order: [['created_at', 'DESC']],
    include: [{ model: db.raw_material }, { model: db.nutrient_profile }]
  });
  return buildPaginatedResponse(rows, count, page, limit);
}

async function getById(id) {
  return db.product.findByPk(id, {
    include: [{ model: db.raw_material }, { model: db.nutrient_profile }, { model: db.producer }]
  });
}

async function create(data) {
  return db.product.create({
    producer_id: data.producerId,
    product_name: data.productName,
    category: data.category,
    processing_method: data.processingMethod,
    shelf_life: data.shelfLife,
    packaging_type: data.packagingType,
    price_per_unit: data.pricePerUnit
  });
}

const UPDATABLE_FIELDS = {
  productName: 'product_name', category: 'category', processingMethod: 'processing_method',
  shelfLife: 'shelf_life', packagingType: 'packaging_type', pricePerUnit: 'price_per_unit'
};

async function update(id, data) {
  const product = await db.product.findByPk(id);
  if (!product) return null;

  const patch = {};
  for (const [key, column] of Object.entries(UPDATABLE_FIELDS)) {
    if (data[key] !== undefined) patch[column] = data[key];
  }
  await product.update(patch);
  return getById(id);
}

async function remove(id) {
  const product = await db.product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
}

module.exports = { list, getById, create, update, remove };
