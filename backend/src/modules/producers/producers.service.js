const { Op } = require('sequelize');
const db = require('../../../models');
const { buildPaginatedResponse } = require('../../utils/pagination');

function parseBbox(bboxParam) {
  if (!bboxParam) return null;
  const parts = String(bboxParam).split(',').map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return null;
  const [minLon, minLat, maxLon, maxLat] = parts;
  return { minLon, minLat, maxLon, maxLat };
}

function buildWhere(filters) {
  const where = { status: filters.status || 'active' };

  if (filters.regionId) where.region_id = filters.regionId;
  if (filters.districtId) where.district_id = filters.districtId;
  if (filters.wardId) where.ward_id = filters.wardId;
  if (filters.verificationStatus) where.verification_status = filters.verificationStatus;
  if (filters.search) {
    where[Op.or] = [
      { business_name: { [Op.iLike]: `%${filters.search}%` } },
      { contact_person: { [Op.iLike]: `%${filters.search}%` } }
    ];
  }
  const bbox = parseBbox(filters.bbox);
  if (bbox) {
    where.latitude = { [Op.between]: [bbox.minLat, bbox.maxLat] };
    where.longitude = { [Op.between]: [bbox.minLon, bbox.maxLon] };
  }
  return where;
}

async function list({ page, limit, offset, filters }) {
  const where = buildWhere(filters);
  const { rows, count } = await db.producer.findAndCountAll({
    where,
    limit,
    offset,
    order: [['created_at', 'DESC']],
    include: [
      { model: db.region, attributes: ['id', 'name'] },
      { model: db.district, attributes: ['id', 'name'] },
      { model: db.ward, attributes: ['id', 'name'] }
    ]
  });
  return buildPaginatedResponse(rows, count, page, limit);
}

async function listAsGeoJson(filters) {
  const where = buildWhere(filters);
  const producers = await db.producer.findAll({
    where,
    limit: 5000,
    attributes: [
      'id', 'business_name', 'contact_person', 'phone', 'verification_status',
      'organization_type', 'latitude', 'longitude'
    ]
  });

  return {
    type: 'FeatureCollection',
    features: producers.map((p) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [p.longitude, p.latitude] },
      properties: {
        id: p.id,
        businessName: p.business_name,
        contactPerson: p.contact_person,
        phone: p.phone,
        verificationStatus: p.verification_status,
        organizationType: p.organization_type
      }
    }))
  };
}

async function getById(id) {
  return db.producer.findByPk(id, {
    include: [
      { model: db.region, attributes: ['id', 'name'] },
      { model: db.district, attributes: ['id', 'name'] },
      { model: db.ward, attributes: ['id', 'name'] }
    ]
  });
}

async function getFullProfile(id) {
  return db.producer.findByPk(id, {
    include: [
      { model: db.region, attributes: ['id', 'name'] },
      { model: db.district, attributes: ['id', 'name'] },
      { model: db.ward, attributes: ['id', 'name'] },
      { model: db.certification },
      {
        model: db.product,
        include: [{ model: db.raw_material }, { model: db.nutrient_profile }]
      }
    ]
  });
}

const FIELD_MAP = {
  firstName: 'first_name', middleName: 'middle_name', lastName: 'last_name',
  registrationType: 'registration_type', ownershipStructure: 'ownership_structure',
  organizationType: 'organization_type',
  businessName: 'business_name', tin: 'tin', contactPerson: 'contact_person',
  positionRole: 'position_role', phone: 'phone', email: 'email',
  regionId: 'region_id', districtId: 'district_id', wardId: 'ward_id',
  physicalAddress: 'physical_address', latitude: 'latitude', longitude: 'longitude',
  productionCapacity: 'production_capacity', dailyOutput: 'daily_output',
  numberOfEmployees: 'number_of_employees', verificationStatus: 'verification_status',
  status: 'status', source: 'source',
  brelaRegistrationNumber: 'brela_registration_number',
  tbsZfdaRegistrationNumber: 'tbs_zfda_registration_number',
  sidoRegistrationNumber: 'sido_registration_number',
  operationalScale: 'operational_scale', operationalStatus: 'operational_status',
  primaryRawMaterials: 'primary_raw_materials',
  primarySourcingChannels: 'primary_sourcing_channels',
  shortageMonths: 'shortage_months',
  postHarvestLossPercent: 'post_harvest_loss_percent',
  storageCapacity: 'storage_capacity', storageCapacityUnit: 'storage_capacity_unit',
  mainStorageChallenges: 'main_storage_challenges',
  nutrientDenseCrops: 'nutrient_dense_crops',
  totalAreaHarvestScale: 'total_area_harvest_scale', areaHarvestUnit: 'area_harvest_unit',
  averageYield: 'average_yield', yieldUnit: 'yield_unit',
  harvestCyclesPerYear: 'harvest_cycles_per_year',
  proximityMajorRoadKm: 'proximity_major_road_km', proximityMarketKm: 'proximity_market_km',
  accessibilityStatus: 'accessibility_status', infrastructureStatus: 'infrastructure_status',
  sanitaryStatus: 'sanitary_status', dataStatus: 'data_status'
};

async function create(data, userId) {
  const payload = { created_by: userId };
  for (const [key, column] of Object.entries(FIELD_MAP)) {
    if (data[key] !== undefined) payload[column] = data[key];
  }
  if (!payload.source) payload.source = 'manual_entry';
  return db.producer.create(payload);
}

const UPDATABLE_FIELDS = FIELD_MAP;

async function update(id, data) {
  const producer = await db.producer.findByPk(id);
  if (!producer) return null;

  const patch = {};
  for (const [key, column] of Object.entries(UPDATABLE_FIELDS)) {
    if (data[key] !== undefined) patch[column] = data[key];
  }
  await producer.update(patch);
  return getById(id);
}

async function remove(id) {
  const producer = await db.producer.findByPk(id);
  if (!producer) return null;
  await producer.update({ status: 'inactive' });
  return true;
}

module.exports = { list, listAsGeoJson, getById, getFullProfile, create, update, remove };
