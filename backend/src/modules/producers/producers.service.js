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

// async function create(data, userId) {
//   const payload = { created_by: userId };
//   for (const [key, column] of Object.entries(FIELD_MAP)) {
//     if (data[key] !== undefined) payload[column] = data[key];
//   }
//   if (!payload.source) payload.source = 'manual_entry';
//   return db.producer.create(payload);
// }

async function create(data, userId) {
  console.log('Creating producer from Kobo submission');

  // Safely retrieve the first available, non-empty value.
  const getValue = (...keys) => {
    for (const key of keys) {
      const value = data[key];

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ''
      ) {
        return value;
      }
    }

    return undefined;
  };

  // Convert a numeric value safely.
  const toNumber = (value) => {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
  };

  const payload = {
    created_by: userId ?? null,
    source: 'kobotoolbox'
  };

  // Map all fields already supported by your existing FIELD_MAP.
  for (const [key, column] of Object.entries(FIELD_MAP)) {
    const value = data[key];

    if (value !== undefined && value !== null && value !== '') {
      payload[column] = value;
    }
  }

  // ---------------------------------------------------
  // 1. Enterprise/business information
  // ---------------------------------------------------

  payload.business_name = getValue(
    'businessName',
    '_1_3_Name_of_Enterprise_Group'
  );

  payload.contact_person = getValue(
    'contactPerson',
    'group_gt2bp34/Primary_Contact_Person'
  );

  payload.position_role = getValue(
    'positionRole',
    'group_gt2bp34/Position_Role'
  );

  payload.phone = getValue(
    'phone',
    'group_gt2bp34/Phone_Number'
  );

  payload.email = getValue(
    'email',
    'group_gt2bp34/E_mail_address'
  );

  payload.physical_address = getValue(
    'physicalAddress',
    'group_gt2bp34/Physical_Street_Address',
    'Village_Street'
  );

  payload.tin = getValue(
    'tin',
    'group_gy4oz23/Taxpayer_Identification_Number_TIN'
  );

  payload.brela_registration_number = getValue(
    'brelaRegistrationNumber',
    'group_gy4oz23/BRELA_Business_Registration_Number'
  );

  payload.tbs_zfda_registration_number = getValue(
    'tbsZfdaRegistrationNumber',
    'group_gy4oz23/TBS_ZFDA_License_P_Registration_Number'
  );

  payload.operational_status = getValue(
    'operationalStatus',
    '_1_6_Operational_Status'
  );

  payload.ownership_structure = getValue(
    'ownershipStructure',
    '_1_4_Enterprise_Ownership_and_L'
  );

  // ---------------------------------------------------
  // 2. GPS coordinates
  // ---------------------------------------------------

  let latitude = toNumber(
    getValue('latitude', '_geolocation_latitude')
  );

  let longitude = toNumber(
    getValue('longitude', '_geolocation_longitude')
  );

  // Kobo geopoint format:
  // latitude longitude altitude accuracy
  const coordinateValue = getValue(
    '_1_2_Coordinate_location',
    'Coordinate_location',
    'coordinates'
  );

  if (
    (latitude === undefined || longitude === undefined) &&
    coordinateValue
  ) {
    const parts = String(coordinateValue)
      .trim()
      .split(/\s+/);

    if (parts.length >= 2) {
      latitude = toNumber(parts[0]);
      longitude = toNumber(parts[1]);
    }
  }

  // Kobo may also provide its system geolocation array.
  if (
    (latitude === undefined || longitude === undefined) &&
    Array.isArray(data._geolocation) &&
    data._geolocation.length >= 2
  ) {
    latitude = toNumber(data._geolocation[0]);
    longitude = toNumber(data._geolocation[1]);
  }

  payload.latitude = latitude;
  payload.longitude = longitude;

  // ---------------------------------------------------
  // 3. Region, district and ward foreign keys
  // ---------------------------------------------------

  // Accept numeric IDs only when supplied explicitly.
  payload.region_id = toNumber( 
    getValue('regionId', 'region_id')
  );

  payload.district_id = toNumber(
    getValue('districtId', 'district_id')
  );

  payload.ward_id = toNumber(
    getValue('wardId', 'ward_id')
  );

  // Kobo sends labels/codes, not database IDs.
  // Resolve these through your database lookup logic.
  const regionName = getValue('Region');
  const districtName = getValue('District');
  const wardName = getValue('Ward');

  /*
   * IMPORTANT:
   * Implement the lookups below using the actual columns
   * in your region, district and ward models.
   *
   * Do not use regionName directly as region_id.
   */

  if (payload.region_id === undefined && regionName) {
    const region = await db.region.findOne({
      where: { name: regionName }
    });

    if (region) {
      payload.region_id = region.id;
    } else {
      console.warn(`Region "${regionName}" not found in database`);
      payload.region_id = 0;
    }
  }

  if (payload.district_id === undefined && districtName) {
    // Example only: adjust field names and association
    // to match your actual District model.
    const district = await db.district.findOne({
      where: { name: districtName }
    });

    if (district) {
      payload.district_id = district.id;
    }
  }

  if (payload.ward_id === undefined && wardName) {
    // Example only: adjust field names and association
    // to match your actual Ward model.
    const ward = await db.ward.findOne({
      where: { name: wardName }
    });

    if (ward) {
      payload.ward_id = ward.id;
    }
  }

  // ---------------------------------------------------
  // 4. Additional fields
  // ---------------------------------------------------

  payload.primary_raw_materials = getValue(
    'primaryRawMaterials',
    '_2_1_Primary_Raw_Materials_Sour'
  );

  payload.primary_sourcing_channels = getValue(
    'primarySourcingChannels',
    '_2_2_Primary_Sourcing_Channels'
  );

  payload.shortage_months = getValue(
    'shortageMonths',
    'group_bi6dd29/_2_3_1_Months_of_Sev_tage_or_Price_Spikes'
  );

  payload.production_capacity = toNumber(
    getValue(
      'productionCapacity',
      'group_in2zi20/_3_2_1_Installed_Pro_ing_Capacity_kg_day'
    )
  );

  payload.number_of_employees = toNumber(
    getValue('numberOfEmployees')
  );

  // ---------------------------------------------------
  // 5. Validate required database fields
  // ---------------------------------------------------

  const errors = [];

  if (!payload.business_name) {
    errors.push('Business name is missing');
  }

  if (
    !Number.isInteger(payload.region_id) ||
    payload.region_id < 1
  ) {
    errors.push(
      `Unable to resolve region "${regionName ?? ''}" to a valid database ID`
    );
  }

  if (!payload.physical_address) {
    errors.push('Physical address is missing');
  }

  if (
    payload.latitude === undefined ||
    payload.latitude < -90 ||
    payload.latitude > 90
  ) {
    errors.push('A valid latitude is required');
  }

  if (
    payload.longitude === undefined ||
    payload.longitude < -180 ||
    payload.longitude > 180
  ) {
    errors.push('A valid longitude is required');
  }

  if (errors.length > 0) {
    const error = new Error(errors.join('; '));
    error.status = 422;
    error.details = errors;
    throw error;
  }

  console.log('Validated Kobo producer payload:', {
    business_name: payload.business_name,
    region_id: payload.region_id,
    district_id: payload.district_id,
    ward_id: payload.ward_id,
    physical_address: payload.physical_address,
    latitude: payload.latitude,
    longitude: payload.longitude
  });

  return db.producer.create(payload);
}

async function createFromForm(data, location) {
  return create({
    businessName: data.business_name,
    registrationType: data.registration_type,
    ownershipStructure: data.ownership_structure,
    organizationType: data.organization_type,
    operationalScale: data.operational_scale,
    phone: data.phone,
    physicalAddress: data.physical_address,
    regionId: location.regionId,
    districtId: location.districtId,
    wardId: location.wardId,
    primaryRawMaterials: data.primary_raw_materials,
    primarySourcingChannels: data.primary_sourcing_channels,
    shortageMonths: data.shortage_months,
    storageCapacity: data.storage_capacity,
    storageCapacityUnit: data.storage_capacity_unit,
    mainStorageChallenges: data.main_storage_challenges,
    nutrientDenseCrops: data.nutrient_dense_crops,
    accessibilityStatus: data.accessibility_status,
    infrastructureStatus: data.infrastructure_status,
    sanitaryStatus: data.sanitary_status,
    latitude: data.latitude,
    longitude: data.longitude,
    source: 'mobile_form'
  }, null);
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

module.exports = { list, listAsGeoJson, getById, getFullProfile, create, createFromForm, update, remove };
