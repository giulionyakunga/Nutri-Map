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
    limit: 100,
    offset,
    order: [['created_at', 'DESC']],
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

  // ---------------------------------------------------
  // 1. Safe value extraction helpers
  // ---------------------------------------------------

  const ARRAY_SEPARATOR = '|||KOBO_OPTION|||';

  const getValue = (...keys) => {
    for (const key of keys) {
      const value = data?.[key];

      if (value !== undefined && value !== null &&
          String(value).trim() !== '') {
        return String(value).trim();
      }
    }
    return undefined;
  };

  // Preserve Kobo's multi-select delimiter.
  // Do not replace it with an ordinary space before splitting.
  const getValue2 = (...keys) => {
    for (const key of keys) {
      const value = data?.[key];

      if (value === undefined || value === null ||
          String(value).trim() === '') {
        continue;
      }

      return String(value)
        .trim()
        .replace(/___/g, ARRAY_SEPARATOR);
    }

    return undefined;
  };

  const toStringArray = (value) => {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    if (Array.isArray(value)) {
      return value.map(v => String(v).trim()).filter(Boolean);
    }

    return String(value)
      .split(ARRAY_SEPARATOR)
      .map(v => v.trim())
      .filter(Boolean);
  };

  const toNumber = (value) => {
    if (value === undefined || value === null ||
        String(value).trim() === '') {
      return undefined;
    }

    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
  };

  // Convert location codes such as dar_es_salaam to Dar Es Salaam.
  const toTitleCase = (value) => {
    if (!value) return value;

    return String(value)
      .replace(/[-_]+/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  const payload = {
    created_by: userId ?? null,
    source: 'kobotoolbox'
  };

  // ---------------------------------------------------
  // 2. Existing FIELD_MAP mappings
  // ---------------------------------------------------

  for (const [key, column] of Object.entries(FIELD_MAP)) {
    const value = data?.[key];

    if (value !== undefined && value !== null && value !== '') {
      payload[column] = value;
    }
  }

  // Helper for mapping fields without repeating checks.
  const mapText = (column, key) => {
    const value = getValue(key);
    if (value !== undefined) payload[column] = value;
  };

  const mapArray = (column, key) => {
    const value = toStringArray(getValue2(key));
    if (value !== undefined) payload[column] = value;
  };

  const mapNumber = (column, key) => {
    const value = toNumber(getValue(key));
    if (value !== undefined) payload[column] = value;
  };

  // ---------------------------------------------------
  // 3. Enterprise information
  // ---------------------------------------------------

  // IMPORTANT: This is the actual key in the new Kobo form.
  payload.business_name = getValue(
    'group_tt2fr91/enterprise_name_final'
  );

  payload.ownership_structure = getValue(
    'group_tt2fr91/_1_4_Enterprise_Ownership_and_L'
  );

  payload.operational_status = getValue(
    'group_pn4gh36/_1_6_Operational_Status'
  );

  payload.tin = getValue(
    'group_pn4gh36/group_gy4oz23/Taxpayer_Identification_Number_TIN'
  );

  payload.brela_registration_number = getValue(
    'group_pn4gh36/group_gy4oz23/BRELA_Business_Registration_Number'
  );

  payload.tbs_zfda_registration_number = getValue(
    'group_pn4gh36/group_gy4oz23/TBS_ZFDA_License_P_Registration_Number'
  );

  // These fields are not present in this particular submission.
  // They will remain undefined rather than receiving fabricated values.
  mapText('contact_person',
    'group_tt2fr91/group_gt2bp34/Primary_Contact_Person');

  mapText('position_role',
    'group_tt2fr91/group_gt2bp34/Position_Role');

  mapText('phone',
    'group_tt2fr91/group_gt2bp34/Phone_Number');

  mapText('email',
    'group_pn4gh36/group_gt2bp34/E_mail_address');

  mapText('physical_address',
    'group_tt2fr91/group_gt2bp34/Physical_Street_Address');

  mapText('business_owner',
    'group_tt2fr91/group_gt2bp34/Name_s_of_the_Business_owner_s');

  mapText('business_owner_email',
    'group_tt2fr91/group_gt2bp34/E_mail_address_of_an_owner');

  // ---------------------------------------------------
  // 4. GPS coordinates
  // ---------------------------------------------------

  let latitude;
  let longitude;

  if (Array.isArray(data?._geolocation)) {
    latitude = toNumber(data._geolocation[0]);
    longitude = toNumber(data._geolocation[1]);
  }

  // Fallback to the coordinate string if necessary.
  if (latitude === undefined || longitude === undefined) {
    const coordinateString = getValue(
      'group_tt2fr91/_1_2_Coordinate_location'
    );

    if (coordinateString) {
      const coordinates = coordinateString.trim().split(/\s+/);

      latitude = toNumber(coordinates[0]);
      longitude = toNumber(coordinates[1]);
    }
  }

  payload.latitude = latitude;
  payload.longitude = longitude;

  // ---------------------------------------------------
  // 5. Region, district, ward and street
  // ---------------------------------------------------

  const regionName = getValue('group_tt2fr91/region');
  const districtName = getValue('group_tt2fr91/district');
  const wardName = getValue('group_tt2fr91/Ward');
  const streetName = getValue('group_tt2fr91/Village_Street');

  payload.region = regionName ? toTitleCase(regionName) : 'N/A';
  payload.district = districtName ? toTitleCase(districtName) : 'N/A';
  payload.ward = wardName || 'N/A';
  payload.street = streetName || 'N/A';

  // Do not assign ward_id = 0.
  // Your current Producer model does not define ward_id.

  console.log('Location:', {
    region: payload.region,
    district: payload.district,
    ward: payload.ward,
    latitude,
    longitude
  });

  // ---------------------------------------------------
  // 6. SME screening information
  // ---------------------------------------------------

  mapArray('registration_type',
    'sme_screening/registration');

  mapText('registration_type_other',
    'sme_screening/registration_other');

  mapText('age_market',
    'sme_screening/age_market');

  mapText('upf_share',
    'sme_screening/upf_share');

  mapText('free_from_additives',
    'sme_screening/free_from_additives');

  // New nested SME scoring paths.
  const SME = 'sme_screening/sme_scoring_only_if_eligible/';

  mapText('formulation',
    SME + 'sme_cat_nutrition/formulation');

  mapText('sme_upf_scoring',
    SME + 'sme_cat_nutrition/sme_upf_scoring');

  mapText('certification',
    SME + 'sme_cat_safety/certification');

  mapText('ssop_logs',
    SME + 'sme_cat_safety/ssop_logs');

  mapText('equipment',
    SME + 'sme_cat_technical/equipment');

  mapText('qualified_staff',
    SME + 'sme_cat_technical/qualified_staff');

  mapText('sourcing',
    SME + 'sme_cat_supply/sourcing');

  mapText('logistics',
    SME + 'sme_cat_supply/logistics');

  mapText('sme_assessment_region',
    SME + 'sme_cat_financial/sme_assessment_region');

  mapText('turnover_tzs',
    SME + 'sme_cat_financial/turnover_tzs');

  mapText('capacity_mt',
    SME + 'sme_cat_financial/capacity_mt');

  mapText('sme_financial_band',
    SME + 'sme_cat_financial/sme_financial_band');

  mapText('management',
    SME + 'sme_cat_management/management');

  mapText('records',
    SME + 'sme_cat_management/records');

  mapText('willingness',
    SME + 'sme_cat_management/willingness');

  mapText('female_owner',
    SME + 'sme_cat_equity/female_owner');

  mapText('youth_owner',
    SME + 'sme_cat_equity/youth_owner');

  mapText('female_workforce',
    SME + 'sme_cat_equity/female_workforce');

  mapText('women_suppliers',
    SME + 'sme_cat_equity/women_suppliers');

  mapNumber('percentage_score',
    SME + 'total_score');

  mapText('selection_tier',
    SME + 'selection_tier');

  // Additional SME screening results.
  mapText('legal_pass', 'sme_screening/legal_pass');
  mapText('scope_pass', 'sme_screening/scope_pass');
  mapText('additive_pass', 'sme_screening/additive_pass');
  mapText('eligibility_pass', 'sme_screening/eligibility_pass');

  mapNumber('nutrition_score',
    SME + 'sme_cat_nutrition/nutrition_score');

  mapNumber('safety_score',
    SME + 'sme_cat_safety/safety_score');

  mapNumber('technical_score',
    SME + 'sme_cat_technical/technical_score');

  mapNumber('supply_score',
    SME + 'sme_cat_supply/supply_score');

  mapNumber('financial_score',
    SME + 'sme_cat_financial/financial_score');

  mapNumber('management_score',
    SME + 'sme_cat_management/management_score');

  mapNumber('equity_count',
    SME + 'sme_cat_equity/equity_count');

  mapNumber('equity_score',
    SME + 'sme_cat_equity/equity_score');

  mapArray('applicable_tiers',
    SME + 'applicable_tiers');

  mapText('remarks_sme_screening',
    'sme_screening/remarks_sme_screening');

  mapText('zanzibar_general_trade_thresholds',
    'group_pn4gh36/group_xo08u06/Zanzibar_General_Trade_Thresholds');

  // ---------------------------------------------------
  // 7. Raw materials and sourcing
  // ---------------------------------------------------

  mapArray('product_types',
    'sme_screening/product_types');

  mapArray('primary_raw_materials',
    'group_ol25s52/_2_1_Primary_Raw_Materials_Sour');

  mapArray('primary_sourcing_channels',
    'group_ol25s52/_2_2_Primary_Sourcing_Channels');

  mapText('adequate_warehouse_storage_available',
    'group_ol25s52/group_bi6dd29/_2_3_1_Adequate_wareh_ld_storage_available');

  mapText('storage_facilities_details',
    'group_ol25s52/group_bi6dd29/storage_facilities_details');

  mapText('functional_dis_logistics_available',
    'group_ol25s52/group_bi6dd29/_2_3_2_Functional_dis_logistics_available');

  mapArray('shortage_months',
    'group_ol25s52/group_bi6dd29/_2_3_3_Months_of_Sev_tage_or_Price_Spikes');

  // ---------------------------------------------------
  // 8. Production and processing
  // ---------------------------------------------------

  mapNumber('production_capacity',
    'group_in2zi20/_3_2_1_Installed_Pro_ing_Capacity_kg_day');

  mapNumber('production_capacity_ton_month',
    'group_in2zi20/_3_2_2_Installed_pro_g_capacity_ton_month');

  mapNumber('actual_operational_output_ton_month',
    'group_in2zi20/group_in2zi20/_3_2_3_Actual_Operat_al_Output_ton_month');

  mapText('machinery_grade_and_processing_setup',
    'group_in2zi20/_3_3_1_Machinery_Grad_and_Processing_Setup');

  mapArray('equipment_installed',
    'group_in2zi20/_3_3_2_Equipment_Inst_Check_all_that_apply');

  mapArray('facility_type',
    'group_in2zi20/_3_3b_Facility_Type');

  mapText('processing_pre_t_i_nutrient_reduction',
    'group_in2zi20/group_xb7se72/_3_5_Processing_Pre_t_i_Nutrient_Reduction');

  mapText('finished_product_categories',
    'group_in2zi20/_3_1_Finished_Product_Categorie');

  // ---------------------------------------------------
  // 9. Nutritional information
  // ---------------------------------------------------

  mapText('nutritional_fact_panel_nfp',
    'group_kt9nn55/group_lh3ly24/Nutritional_Fact_Panel_NFP_001');

  mapNumber('total_energy_density',
    'group_kt9nn55/group_vp5fe72/Total_Energy_Density_kcal_100g_');

  mapNumber('crude_protein_content',
    'group_kt9nn55/group_vp5fe72/Crude_Protein_Conten_dry_weight_g_100g');

  mapNumber('total_crude_fat',
    'group_kt9nn55/group_vp5fe72/Total_Crude_Fat_Li_y_weight_g_100g');

  mapNumber('total_carbohydrates',
    'group_kt9nn55/group_vp5fe72/Total_Carbohydrates_g_100g');

  mapNumber('crude_fiber_target',
    'group_kt9nn55/group_vp5fe72/Crude_Fiber_Target_g_infants_g_100g');

  mapNumber('moisture_content',
    'group_kt9nn55/group_vp5fe72/Moisture_Content_Ta_ability_and_safety_');

  mapNumber('iodine_content',
    'group_kt9nn55/group_lh3ly24/Iodine_I_g_100g');

  mapNumber('folate_content',
    'group_kt9nn55/group_lh3ly24/Folate_Vitamin_B9_g_100g');

  mapText('polyunsaturated_fatty_acids',
    'group_kt9nn55/group_uu6rr68/Polyunsaturated_Fatty_Acids_PUFAs');

  mapArray('pro_vitamin_a_biofortification_source',
    'group_kt9nn55/group_uu6rr68/Pro_Vitamin_A_Biofortification_Source');

  mapText('has_laboratory_molar_on_finished_product',
    'group_kt9nn55/group_lw3my57/Has_laboratory_molar_on_finished_product');

  mapText('recommended_frequency_of_consumption',
    'group_kt9nn55/group_ml11l40/Recommended_Frequency_of_Consumption');

  // ---------------------------------------------------
  // 10. Certification and regulatory compliance
  // ---------------------------------------------------

  mapText('tbs_certification_tanzania_business',
    'group_vz9uu61/group_rc6ev70/group_rn6pd43/_5_1_Certification_an_ng_20_Points_Total');

  mapText('if_full_certified_state_the_standard',
    'group_vz9uu61/group_rc6ev70/group_rn6pd43/If_full_certified_state_the_st');

  mapText('zfda_registration_z_food_and_drug_agency',
    'group_vz9uu61/group_rc6ev70/group_rn6pd43/ZFDA_Registration_Z_Food_and_Drug_Agency');

  mapText('sectoral_regulatory_board_milk_board',
    'group_vz9uu61/group_rc6ev70/group_rn6pd43/Sector_Board_Complia_t_Board_Milk_Board');

  mapText('tbs_expiry_date',
    'group_vz9uu61/group_rc6ev70/group_rn6pd43/TBS_Expiry_Date');

  mapText('incubation_status',
    'group_vz9uu61/group_rc6ev70/group_rn6pd43/Incubation_Status');

  mapText('nd_batch_record_logs',
    'group_vz9uu61/group_rc6ev70/group_ed6sx51/Does_the_enterprise_ND_batch_record_logs');

  mapArray('quality_control_infrastructure',
    'group_vz9uu61/group_rc6ev70/_5_3_Quality_Control_sting_Infrastructure');

  mapText('quality_control_testing_protocols',
    'group_vz9uu61/group_rc6ev70/_5_4_Quality_Control_ty_Testing_Protocols');

  mapText('external_specialized_testing_utilization',
    'group_vz9uu61/group_rc6ev70/External_Specialized_Testing_Utilization');

  // ---------------------------------------------------
  // 11. Packaging
  // ---------------------------------------------------

  mapText('type_of_packaging_currently_used',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/Type_of_packaging_cu_the_finished_product');

  mapText('packaging_material',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/Packaging_material_c_aterial_or_structure');

  mapText('is_packaging_designed_to_protect_product_from_moisture',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_the_packaging_des_roduct_from_moisture');

  mapText('is_packaging_designed_to_protect_product_from_oxygen',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_the_packaging_des_product_from_oxygen');

  mapText('is_packaging_designed_to_protect_product_from_light',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_the_packaging_des_e_product_from_light');

  mapText('is_packaging_designed_for_high_fat_products',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_the_packaging_res_th_high_fat_products');

  mapText('is_any_packaging_material_specified',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_any_packaging_material_spec');

  mapArray('has_the_suitability_tested_with_the_product',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/Has_the_suitability_ted_with_the_product');

  mapText('primary_method_used_to_seal_the_package',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/Primary_method_used_to_seal_the_package');

  mapText('vulnerability_to_rancidity_lipid_oxidation',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/Vulnerability_to_Ran_ty_Lipid_Oxidation');

  mapText('traceability_integration',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/Traceability_Integration');

  // ---------------------------------------------------
  // 12. Distribution
  // ---------------------------------------------------

  mapArray('distribution_channels',
    'group_pg1io48/_6_1_Distribution_Channels_Place');

  mapArray('geographic_distribution_scope',
    'group_pg1io48/_6_1_1_Geographic_Distribution_Scope');

  mapText('packaging_supply_constraints',
    'group_pg1io48/_6_6_Packaging_supply_constraints');

  // ---------------------------------------------------
  // 13. Workforce
  // ---------------------------------------------------

  mapNumber('number_of_employees',
    'group_mu73u63/group_oe5kd34/_7_3_5_Total_Workforce');

  mapNumber('permanent_male_employees',
    'group_mu73u63/group_oe5kd34/_7_3_1_Permanent_Male_Employees');

  mapNumber('permanent_female_employees',
    'group_mu73u63/group_oe5kd34/_7_3_2_Permanent_Female_Employees');

  mapNumber('casual_male_employees',
    'group_mu73u63/group_oe5kd34/_7_3_3_Casual_Male_Employees');

  mapNumber('casual_female_employees',
    'group_mu73u63/group_oe5kd34/_7_3_4_Casual_Female_Employees');

  mapText('financial_inclusiveness_infrastructure',
    'group_mu73u63/_7_4_Financial_Inclus_iness_Infrastructure');

  mapText('specify_financial_inclusiveness_infrastructure',
    'group_mu73u63/Specify_Financial_In_iness_Infrastructure');

  // ---------------------------------------------------
  // 14. Validate required fields
  // ---------------------------------------------------

  const errors = [];

  if (!payload.business_name) {
    errors.push('Business name is missing');
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

  // ---------------------------------------------------
  // 15. Create producer
  // ---------------------------------------------------

  console.log('Validated Kobo producer payload:', {
    business_name: payload.business_name,
    region: payload.region,
    district: payload.district,
    ward: payload.ward,
    latitude: payload.latitude,
    longitude: payload.longitude,
    percentage_score: payload.percentage_score,
    selection_tier: payload.selection_tier
  });

  console.log('Creating producer record...');
  console.log('Producer payload:', payload);

  const producer = await db.producer.create(payload);

  // ---------------------------------------------------
  // 16. Save Kobo survey metadata
  // ---------------------------------------------------

  const survey_payload = {
    producer_id: producer.id,
    kobotoolbox_submission_id: getValue('_id'),
    enumerator: getValue('group_tt2fr91/Enumerator_s_name'),
    data_stream_source: getValue('group_tt2fr91/Data_Stream_Source'),
    source: 'kobotoolbox'
  };

  await db.survey.create(survey_payload);

  console.log('Producer successfully created:', producer.id);

  return producer;
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
