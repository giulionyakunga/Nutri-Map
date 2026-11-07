const { Op } = require('sequelize');
const path = require('path');


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




// const downloadKoboImages = async (data) => {
//   const imageDirectory = path.resolve(process.cwd(), 'images');

//   const attachments = Array.isArray(data) ? data : data?._attachments;
//   if (!Array.isArray(attachments)) return [];

//   const downloadedFiles = [];

//   for (let index = 0; index < attachments.length; index++) {
//     const att = attachments[index];
//     if (!att || att.is_deleted === true) continue;

//     // --- FIX STARTS HERE ---
//     const baseUrl = att.download_medium_url || att.download_url;
//     const filename = att.filename; // Use the full path, not just the basename
//     const displayName = att.media_file_basename;

//     if (!baseUrl || !filename) {
//       console.log(`[${index}] (missing URL or filename)`);
//       continue;
//     }

//     // Construct the valid URL with the media_file query parameter
//     const cleanBase = baseUrl.split('?')[0];
//     const fullUrl = `${cleanBase}?media_file=${encodeURIComponent(filename)}`;
//     // --- FIX ENDS HERE ---

//     console.log(`[${index}] Downloading: ${displayName}`);
//     downloadedFiles.push(displayName);


//     const destination = path.join(imageDirectory, displayName);

//     try {
//       const headers = process.env.KOBO_API_TOKEN
//         ? { Authorization: `Token efcbe55609323fae7442cad564a90d4e57ba7f2a` }
//         : {};

//       // Fetch the CORRECTED url
//       const response = await fetch(fullUrl, { headers });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log(`Response text for ${displayName}:`, errorText);
//         console.error(`Failed to download ${displayName} from ${fullUrl}: HTTP ${response.status}: ${response.statusText}`);
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }

//       const imageBuffer = Buffer.from(await response.arrayBuffer());
//       await fs.writeFile(destination, imageBuffer);

//       console.log(`Downloaded ${displayName} → ${destination}`);
//     } catch (error) {
//       console.error(`Failed to download ${displayName} from ${fullUrl}:`, error.message);
//     }
//   }

//   return downloadedFiles;
// };





const fs = require('fs').promises;   // ← THIS is the critical fix

const KOBO_API_TOKEN = 'efcbe55609323fae7442cad564a90d4e57ba7f2a';

const downloadKoboImages = async (data) => {
  const imageDirectory = path.resolve(process.cwd(), 'images');

  console.log(`Ensuring image directory exists: ${imageDirectory}`);
  // await fs.mkdir(imageDirectory, { recursive: true });
  console.log(`Done ensuring image directory exists: ${imageDirectory}`);

  const attachments = Array.isArray(data) ? data : data?._attachments;
  if (!Array.isArray(attachments)) return [];

  const downloadedFiles = [];

  for (let index = 0; index < attachments.length; index++) {
    const att = attachments[index];
    if (!att || att.is_deleted === true) continue;

    const displayName = att.media_file_basename;
    downloadedFiles.push(displayName);
    if (!displayName) {
      console.log(`[${index}] (missing media_file_basename)`);
      continue;
    }

    // Use the v2 medium URL directly. It is complete; do NOT append media_file.
    const downloadUrl = att.download_medium_url;

    if (!downloadUrl) {
      console.log(`[${index}] (missing download_medium_url)`);
      continue;
    }

    const destination = path.join(imageDirectory, displayName);
    console.log(`[${index}] Downloading ${displayName} from ${downloadUrl}`);

    try {
      const headers = KOBO_API_TOKEN
        ? { Authorization: `Token ${KOBO_API_TOKEN}` }
        : {};

      const response = await fetch(downloadUrl, { headers });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        console.error(
          `[${index}] HTTP ${response.status} for ${displayName}: ${body.slice(0, 120)}`
        );
        continue;
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const body = await response.text();
        console.error(`[${index}] JSON error for ${displayName}: ${body.slice(0, 120)}`);
        continue;
      }

      const imageBuffer = Buffer.from(await response.arrayBuffer());

      // Use the PROMISE-based writeFile (fs is fs.promises now)
      await fs.writeFile(destination, imageBuffer);

      console.log(`[${index}] Downloaded ${displayName} (${imageBuffer.length} bytes)`);
      

    } catch (error) {
      console.error(`[${index}] Error for ${displayName}:`, error.message);
    }
  }

  console.log(`Downloaded ${downloadedFiles.length}/${attachments.length} attachments`);
  return downloadedFiles;
};

async function create(data, userId) {
  console.log('Creating producer from Kobo submission:', data?._id);

  // -------------------------------------------------------
  // 1. Kobo value extraction and conversion helpers
  // -------------------------------------------------------

  const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    value === 'None' ||
    value === 'NA';

  // Return the original value. Do not stringify arrays here.
  const getRawValue = (...keys) => {
    for (const key of keys) {
      const value = data?.[key];

      if (!isEmpty(value)) {
        return value;
      }
    }

    return undefined;
  };

  // For database columns that are scalar strings.
  const toText = (value) => {
    if (isEmpty(value)) return undefined;

    if (Array.isArray(value)) {
      // Do not silently store a multi-select array in a scalar column.
      return value.map(v => String(v).trim()).filter(Boolean).join(', ');
    }

    return String(value).trim();
  };

  // For Kobo select_multiple fields.
  // Kobo commonly sends "choice_one choice_two".
  // Underscores are part of choice names and must be preserved.
  const toKoboArray = (value) => {
    if (isEmpty(value)) return undefined;

    if (Array.isArray(value)) {
      const result = value
        .map(v => String(v).trim())
        .filter(Boolean);

      return result.length ? result : undefined;
    }

    const result = String(value)
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return result.length ? result : undefined;
  };

  // For a scalar value that must be stored as a one-element array.
  // Example: "Mr Kuku Kuku in Dar" -> ["Mr Kuku Kuku in Dar"].
  const toSingleValueArray = (value) => {
    if (isEmpty(value)) return undefined;

    if (Array.isArray(value)) {
      const result = value
        .map(v => String(v).trim())
        .filter(Boolean);

      return result.length ? result : undefined;
    }

    return [String(value).trim()];
  };

  const toNumber = (value) => {
    if (isEmpty(value)) return undefined;

    // Reject values such as "1,200" unless explicitly normalized.
    const number = Number(value);

    return Number.isFinite(number) ? number : undefined;
  };

  const toInteger = (value) => {
    const number = toNumber(value);

    return number !== undefined && Number.isInteger(number)
      ? number
      : undefined;
  };

  const toTitleCase = (value) => {
    if (isEmpty(value)) return undefined;

    return String(value)
      .replace(/[-_]+/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  const payload = {
    created_by: userId ?? null,
    source: 'kobotoolbox'
  };

  // -------------------------------------------------------
  // 2. Mapping helpers
  // -------------------------------------------------------

  const mapText = (column, key) => {
    const value = toText(getRawValue(key));

    if (value !== undefined) {
      payload[column] = value;
    }
  };

  const mapArray = (column, key) => {
    const value = toKoboArray(getRawValue(key));

    if (value !== undefined) {
      payload[column] = value;
    }
  };

  const mapSingleArray = (column, key) => {
    const value = toSingleValueArray(getRawValue(key));

    if (value !== undefined) {
      payload[column] = value;
    }
  };

  const mapNumber = (column, key) => {
    const value = toNumber(getRawValue(key));

    if (value !== undefined) {
      payload[column] = value;
    }
  };

  const mapInteger = (column, key) => {
    const value = toInteger(getRawValue(key));

    if (value !== undefined) {
      payload[column] = value;
    }
  };

  // Map a list of scalar fields.
  const mapTextFields = (fields) => {
    for (const [column, key] of fields) {
      mapText(column, key);
    }
  };

  // Map a list of select_multiple fields.
  const mapArrayFields = (fields) => {
    for (const [column, key] of fields) {
      mapArray(column, key);
    }
  };

  const mapNumberFields = (fields) => {
    for (const [column, key] of fields) {
      mapNumber(column, key);
    }
  };

  // -------------------------------------------------------
  // 3. Enterprise information
  // -------------------------------------------------------

  mapText('business_name',
    'group_tt2fr91/enterprise_name_final');

  mapArray('ownership_structure',
    'group_tt2fr91/_1_4_Enterprise_Ownership_and_L');

  mapText('ownership_structure_other',
    'group_tt2fr91/_1_4b_Specify_other_ered_legal_structure');

  mapText('operational_status',
    'group_pn4gh36/_1_6_Operational_Status');

  mapText('tin',
    'group_pn4gh36/group_gy4oz23/Taxpayer_Identification_Number_TIN');

  mapText('brela_registration_number',
    'group_pn4gh36/group_gy4oz23/BRELA_Business_Registration_Number');

  mapText('tbs_zfda_registration_number',
    'group_pn4gh36/group_gy4oz23/TBS_ZFDA_License_P_Registration_Number');

  mapText('sectoral_regulatory_board_milk_board',
    'group_pn4gh36/group_gy4oz23/Sectoral_Regulatory_ry_Board_Milk_Board');

  mapText('contact_person',
    'group_tt2fr91/group_gt2bp34/Primary_Contact_Person');

  mapText('position_role',
    'group_tt2fr91/group_gt2bp34/Position_Role');

  mapText('phone',
    'group_tt2fr91/group_gt2bp34/Phone_Number');

  // This submission contains the owner's email under this key.
  // It does not contain the old generic E_mail_address key.
  mapText('business_owner_email',
    'group_tt2fr91/group_gt2bp34/E_mail_address_of_an_owner');

  // Keep email as a separate business email only if the form has
  // a separate business email question in other submissions.
  mapText('email',
    'group_tt2fr91/group_gt2bp34/E_mail_address');

  mapText('physical_address',
    'group_tt2fr91/group_gt2bp34/Physical_Street_Address');

  mapText('business_owner',
    'group_tt2fr91/group_gt2bp34/Name_s_of_the_Business_owner_s');

  mapText('enterprise_company_select',
    'group_tt2fr91/enterprise_company_select');

  // The sample has a production threshold. It is mapped to the
  // existing operational_scale field.
  mapText('operational_scale',
    'group_pn4gh36/group_xo08u06/Mainland_Production_ng_Sector_Thresholds');

  mapText('zanzibar_general_trade_thresholds',
    'group_pn4gh36/group_xo08u06/Zanzibar_General_Trade_Thresholds');

  // -------------------------------------------------------
  // 4. Enterprise location and survey metadata
  // -------------------------------------------------------

  mapText('region', 'group_tt2fr91/region');
  mapText('district', 'group_tt2fr91/district');
  mapText('ward', 'group_tt2fr91/Ward');
  mapText('street', 'group_tt2fr91/Village_Street');

  if (payload.region) {
    payload.region = toTitleCase(payload.region);
  }

  if (payload.district) {
    payload.district = toTitleCase(payload.district);
  }

  mapText('survey_date',
    'group_tt2fr91/Date_and_Time_of_Survey');

  mapText('landmark',
    'group_tt2fr91/group_gt2bp34/Landmark');

  mapText('landmark_response_method',
    'group_tt2fr91/group_gt2bp34/Landmark_response_methods');

  // -------------------------------------------------------
  // 5. Additional enterprise and product information
  // -------------------------------------------------------

  mapArray('nutrient_dense_crops',
    'group_ol25s52/G_1_1_Primary_Nutrient_Dense_C');

  mapText('ingredients',
    'group_in2zi20/Specify_the_ingredients');

  // The Kobo answer is a scalar string, but the existing model
  // stores commercial_brand_names as ARRAY(STRING).
  mapSingleArray('commercial_brand_names',
    'group_in2zi20/Commercial_Brand_T_Name_s_of_Products');

  mapTextFields([
    ['commercial_product_1', 'group_in2zi20/commercial_product_1'],
    ['commercial_product_2', 'group_in2zi20/commercial_product_2'],
    ['commercial_product_3', 'group_in2zi20/commercial_product_3']
  ]);

  mapText('other_finished_product_categories',
    'group_in2zi20/Other_finished_product_categor');

  // -------------------------------------------------------
  // 6. Storage information
  // -------------------------------------------------------

  mapNumberFields([
    ['total_quantity_required_per_season_month',
      'group_ol25s52/group_bi6dd29/_2_3_4_Total_quantit_red_per_season_month'],

    ['quantity_handled_stored_low_season',
      'group_ol25s52/group_bi6dd29/quantity_handled_stored_low_season'],

    ['quantity_handled_stored_high_season',
      'group_ol25s52/group_bi6dd29/quantity_handled_stored_high_season'],

    ['quantity_lost_or_spoiled',
      'group_ol25s52/group_bi6dd29/_2_3_6_Quantity_lost_or_spoiled']
  ]);

  mapTextFields([
    ['quantity_stored_unit',
      'group_ol25s52/group_bi6dd29/_2_3_2_Unit_stored_per_season_'],

    ['unit_lost_or_spoiled',
      'group_ol25s52/group_bi6dd29/Unit_lost_or_spoiled'],

    ['main_storage_capacity_unit',
      'group_ol25s52/group_bi6dd29/_2_3_4_Raw_Material_Storage_Ca'],

    ['storage_facilities_details',
      'group_ol25s52/group_bi6dd29/storage_facilities_details']
  ]);

  mapArray('main_storage_challenges',
    'group_ol25s52/group_bi6dd29/_2_3_8_Main_Storage_Challenges');

  mapText('adequate_warehouse_storage_available',
    'group_ol25s52/group_bi6dd29/_2_3_1_Adequate_wareh_ld_storage_available');

  mapText('functional_dis_logistics_available',
    'group_ol25s52/group_bi6dd29/_2_3_2_Functional_dis_logistics_available');

  mapArray('shortage_months',
    'group_ol25s52/group_bi6dd29/_2_3_3_Months_of_Sev_tage_or_Price_Spikes');

  // -------------------------------------------------------
  // 7. Agricultural production information
  // -------------------------------------------------------

  mapNumberFields([
    ['total_area_crops_cultivated',
      'group_ol25s52/group_gx2yj41/Total_Area_of_crops_Cultivated_acre'],

    ['total_area_harvested',
      'group_ol25s52/group_gx2yj41/Total_area_harvested_acre'],

    ['ropes_for_seaweed_harvested',
      'group_ol25s52/group_gx2yj41/Ropes_for_Seaweed_harvested'],

    ['amount_of_seaweed_harvested',
      'group_ol25s52/group_gx2yj41/Amount_of_seaweed_harvested_kg'],

    ['number_of_boats_for_dagaa',
      'group_ol25s52/group_gx2yj41/Number_of_Boats_for_Dagaa'],

    ['average_crop_yield_per_harvest',
      'group_ol25s52/group_gx2yj41/Average_crop_yield_per_harvest_kg'],

    ['total_harvest_amount',
      'group_ol25s52/group_ax9vm71/group_qb6sl57/A_Total_harvest_amount'],

    ['amount_lost_or_spoiled',
      'group_ol25s52/group_ax9vm71/group_qb6sl57/B_Amount_lost_or_spoiled']
  ]);

  mapTextFields([
    ['harvest_cycles_per_year',
      'group_ol25s52/group_gx2yj41/Number_of_Harvest_Cycles_per_Year'],

    ['other_seed_source',
      'group_ol25s52/group_ge33v43/other_g2_1_source'],

    ['other_agricultural_practice',
      'group_ol25s52/group_ge33v43/other_g2_2_practice'],

    ['other_drying_method',
      'group_ol25s52/group_ax9vm71/other_g3_1_method'],

    ['unit_total_harvest_amount',
      'group_ol25s52/group_ax9vm71/group_qb6sl57/Unit_of_total_harvest_amount'],

    ['specify_other_harvest_unit',
      'group_ol25s52/group_ax9vm71/group_qb6sl57/Specify_other_unit_o_total_harvest_amount'],

    ['unit_amount_lost_or_spoiled',
      'group_ol25s52/group_ax9vm71/group_qb6sl57/Unit_of_amount_lost_or_spoiled'],

    ['other_unit_lost_or_spoiled',
      'group_ol25s52/group_ax9vm71/Specify_other_unit_o_unt_lost_or_spaoiled'],

    ['other_post_harvest_loss_cause',
      'group_ol25s52/Specify_other_cause_ss_at_the_farm_level'],

    ['other_buyers_of_produce',
      'group_ol25s52/Specify_other_buyers_of_your_produce'],

    ['selling_price_unit',
      'group_ol25s52/group_pp1qb95/Price_unit'],

    ['farmer_harvester_ownership_other',
      'group_ol25s52/group_eo8qx62/G_5_1_Farmer_Harvester_Ownership_Status_other_specify'],

    ['top_three_production_challenges',
      'group_ol25s52/group_eo8qx62/G_5_2_Top_3_Challeng_Production_Expansion']
  ]);

  mapArrayFields([
    ['primary_raw_materials',
      'group_ol25s52/_2_1_Primary_Raw_Materials_Sour'],

    ['primary_sourcing_channels',
      'group_ol25s52/_2_2_Primary_Sourcing_Channels'],

    ['source_of_seed_material',
      'group_ol25s52/group_ge33v43/G_2_1_Source_of_Seed_terial_Fingerlings'],

    ['good_agricultural_practices',
      'group_ol25s52/group_ge33v43/G_2_2_Good_Agricultu_ctices_GAP_Applied'],

    ['drying_method',
      'group_ol25s52/group_ax9vm71/G_3_1_How_do_you_dry_roduce_after_harvest'],

    ['main_causes_post_harvest_loss',
      'group_ol25s52/G_3_3_Main_causes_of_ss_at_the_farm_level'],

    ['buyers_of_produce',
      'group_ol25s52/G_4_1_Who_buys_your_produce'],

    ['payment_terms',
      'group_ol25s52/group_pp1qb95/Payment_terms'],

    ['farmer_harvester_ownership_status',
      'group_ol25s52/group_eo8qx62/G_5_1_Farmer_Harvester_Ownership_Status']
  ]);

  mapNumber('average_selling_price_per_unit',
    'group_ol25s52/group_pp1qb95/Average_Selling_Price_per_Unit');

  // -------------------------------------------------------
  // 8. SME screening
  // -------------------------------------------------------

  mapArray('registration_type', 'sme_screening/registration');

  mapTextFields([
    ['registration_type_other', 'sme_screening/registration_other'],
    ['age_market', 'sme_screening/age_market'],
    ['upf_share', 'sme_screening/upf_share'],
    ['free_from_additives', 'sme_screening/free_from_additives'],
    ['legal_pass', 'sme_screening/legal_pass'],
    ['scope_pass', 'sme_screening/scope_pass'],
    ['additive_pass', 'sme_screening/additive_pass'],
    ['eligibility_pass', 'sme_screening/eligibility_pass']
  ]);

  mapArray('product_types', 'sme_screening/product_types');

  const SME = 'sme_screening/sme_scoring_only_if_eligible/';

  mapTextFields([
    ['formulation', SME + 'sme_cat_nutrition/formulation'],
    ['sme_upf_scoring', SME + 'sme_cat_nutrition/sme_upf_scoring'],
    ['certification', SME + 'sme_cat_safety/certification'],
    ['ssop_logs', SME + 'sme_cat_safety/ssop_logs'],
    ['equipment', SME + 'sme_cat_technical/equipment'],
    ['qualified_staff', SME + 'sme_cat_technical/qualified_staff'],
    ['sourcing', SME + 'sme_cat_supply/sourcing'],
    ['logistics', SME + 'sme_cat_supply/logistics'],
    ['sme_assessment_region', SME + 'sme_cat_financial/sme_assessment_region'],
    ['sme_financial_band', SME + 'sme_cat_financial/sme_financial_band'],
    ['management', SME + 'sme_cat_management/management'],
    ['records', SME + 'sme_cat_management/records'],
    ['willingness', SME + 'sme_cat_management/willingness'],
    ['female_owner', SME + 'sme_cat_equity/female_owner'],
    ['youth_owner', SME + 'sme_cat_equity/youth_owner'],
    ['women_suppliers', SME + 'sme_cat_equity/women_suppliers'],
    ['female_workforce', SME + 'sme_cat_equity/female_workforce'],
    ['selection_tier', SME + 'selection_tier'],
    ['applicable_tiers', SME + 'applicable_tiers']
  ]);

  mapNumberFields([
    ['nutrition_score', SME + 'sme_cat_nutrition/nutrition_score'],
    ['safety_score', SME + 'sme_cat_safety/safety_score'],
    ['technical_score', SME + 'sme_cat_technical/technical_score'],
    ['supply_score', SME + 'sme_cat_supply/supply_score'],
    ['financial_score', SME + 'sme_cat_financial/financial_score'],
    ['management_score', SME + 'sme_cat_management/management_score'],
    ['equity_count', SME + 'sme_cat_equity/equity_count'],
    ['equity_score', SME + 'sme_cat_equity/equity_score'],
    ['percentage_score', SME + 'total_score'],
    ['turnover_tzs', SME + 'sme_cat_financial/turnover_tzs'],
    ['capacity_mt', SME + 'sme_cat_financial/capacity_mt']
  ]);

  // -------------------------------------------------------
  // 9. Production and processing
  // -------------------------------------------------------

  mapNumberFields([
    ['production_capacity',
      'group_in2zi20/_3_2_1_Installed_Pro_ing_Capacity_kg_day'],

    ['production_capacity_ton_month',
      'group_in2zi20/_3_2_2_Installed_pro_g_capacity_ton_month'],

    ['actual_operational_output_ton_month',
      'group_in2zi20/_3_2_3_Actual_Operat_al_Output_ton_month']
  ]);

  mapTextFields([
    ['machinery_grade_and_processing_setup',
      'group_in2zi20/_3_3_1_Machinery_Grad_and_Processing_Setup'],

    ['other_equipment',
      'group_in2zi20/equipment_other_specify'],

    ['other_facility_type',
      'group_in2zi20/_3_3b_Facility_Type_other_specify'],

    ['other_processing_pre_treatment',
      'group_in2zi20/group_xb7se72/pretreatment_other_specify'],

    ['processing_remarks',
      'group_in2zi20/remarks_group_in2zi20'],

    ['other_finished_product_categories',
      'group_in2zi20/Other_finished_product_categor']
  ]);

  mapArrayFields([
    ['equipment_installed',
      'group_in2zi20/_3_3_2_Equipment_Inst_Check_all_that_apply'],

    ['facility_type',
      'group_in2zi20/_3_3b_Facility_Type'],

    ['processing_pre_t_i_nutrient_reduction',
      'group_in2zi20/group_xb7se72/_3_5_Processing_Pre_t_i_Nutrient_Reduction'],

    ['finished_product_categories',
      'group_in2zi20/_3_1_Finished_Product_Categorie']
  ]);

  // -------------------------------------------------------
  // 10. Nutritional information
  // -------------------------------------------------------

  // Both NFP questions exist in the submitted data.
  // The original model field is retained and maps to the
  // first NFP question in the lh3ly24 group.
  mapText('nutritional_fact_panel_nfp',
    'group_kt9nn55/group_lh3ly24/Nutritional_Fact_Panel_NFP_001');

  mapText('nutritional_fact_panel_general',
    'group_kt9nn55/group_vp5fe72/Nutritional_Fact_Panel_NFP');

  mapNumberFields([
    ['total_energy_density',
      'group_kt9nn55/group_vp5fe72/Total_Energy_Density_kcal_100g_'],

    ['crude_protein_content',
      'group_kt9nn55/group_vp5fe72/Crude_Protein_Conten_dry_weight_g_100g'],

    ['total_crude_fat',
      'group_kt9nn55/group_vp5fe72/Total_Crude_Fat_Li_y_weight_g_100g'],

    ['total_carbohydrates',
      'group_kt9nn55/group_vp5fe72/Total_Carbohydrates_g_100g'],

    ['crude_fiber_target',
      'group_kt9nn55/group_vp5fe72/Crude_Fiber_Target_g_infants_g_100g'],

    ['moisture_content',
      'group_kt9nn55/group_vp5fe72/Moisture_Content_Ta_ability_and_safety_'],

    ['iron_content',
      'group_kt9nn55/group_lh3ly24/Iron_Fe_WHO_RDA_6_1_mg_day_mg_100g'],

    ['zinc_content',
      'group_kt9nn55/group_lh3ly24/Zinc_Zn_WHO_RDA_mg_day_mg_100g'],

    ['vitamin_a_content',
      'group_kt9nn55/group_lh3ly24/Vitamin_A_Beta_Caro_g_day_g_RAE_100g'],

    ['calcium_content',
      'group_kt9nn55/group_lh3ly24/Calcium_Ca_Target_0_mg_day_mg_100g'],

    ['iodine_content',
      'group_kt9nn55/group_lh3ly24/Iodine_I_g_100g'],

    ['folate_content',
      'group_kt9nn55/group_lh3ly24/Folate_Vitamin_B9_g_100g'],

    ['phytate_to_iron_molar_ratio',
      'group_kt9nn55/group_lw3my57/Phytate_to_Iron_Mola_ent_Iron_absorption_'],

    ['phytate_to_zinc_molar_ratio',
      'group_kt9nn55/group_lw3my57/Phytate_to_Zinc_Mola_ent_Zinc_absorption_'],

    ['tannin_content',
      'group_kt9nn55/group_lw3my57/Tannin_Content_mg_100g']
  ]);

  mapArrayFields([
    ['polyunsaturated_fatty_acids',
      'group_kt9nn55/group_uu6rr68/Polyunsaturated_Fatty_Acids_PUFAs'],

    ['pro_vitamin_a_biofortification_source',
      'group_kt9nn55/group_uu6rr68/Pro_Vitamin_A_Biofortification_Source']
  ]);

  mapTextFields([
    ['has_laboratory_molar_on_finished_product',
      'group_kt9nn55/group_lw3my57/Has_laboratory_molar_on_finished_product'],

    ['recommended_frequency_of_consumption',
      'group_kt9nn55/group_ml11l40/Recommended_Frequency_of_Consumption'],

    ['nutrition_remarks',
      'group_kt9nn55/remarks_group_kt9nn55']
  ]);

  // -------------------------------------------------------
  // 11. Certification and regulatory compliance
  // -------------------------------------------------------

  mapTextFields([
    ['tbs_certification_tanzania_business',
      'group_vz9uu61/group_rc6ev70/group_rn6pd43/TBS_Certification_Tanzania_Bu'],

    ['if_full_certified_state_the_standard_other',
      'group_vz9uu61/group_rc6ev70/group_rn6pd43/If_full_certified_state_the_st_other_specify'],

    ['zfda_registration_z_food_and_drug_agency',
      'group_vz9uu61/group_rc6ev70/group_rn6pd43/ZFDA_Registration_Z_Food_and_Drug_Agency'],

    ['sectoral_regulatory_board_milk_board',
      'group_vz9uu61/group_rc6ev70/group_rn6pd43/Sector_Board_Complia_t_Board_Milk_Board'],

    ['tbs_expiry_date',
      'group_vz9uu61/group_rc6ev70/group_rn6pd43/TBS_Expiry_Date'],

    ['incubation_status',
      'group_vz9uu61/group_rc6ev70/group_rn6pd43/Incubation_Status'],

    ['nd_batch_record_logs',
      'group_vz9uu61/group_rc6ev70/group_ed6sx51/Does_the_enterprise_ND_batch_record_logs'],

    ['if_full_certified_state_the_standard',
      'group_vz9uu61/group_rc6ev70/group_rn6pd43/If_full_certified_state_the_st']
  ]);

  mapArrayFields([
    ['quality_control_infrastructure',
      'group_vz9uu61/group_rc6ev70/_5_3_Quality_Control_sting_Infrastructure'],

    ['quality_control_testing_protocols',
      'group_vz9uu61/group_rc6ev70/_5_4_Quality_Control_ty_Testing_Protocols'],

    ['external_specialized_testing_utilization',
      'group_vz9uu61/group_rc6ev70/External_Specialized_Testing_Utilization']
  ]);

  // -------------------------------------------------------
  // 12. Packaging
  // -------------------------------------------------------

  mapArrayFields([
    ['type_of_packaging_currently_used',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/Type_of_packaging_cu_the_finished_product'],

    ['packaging_material',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/Packaging_material_c_aterial_or_structure'],

    ['primary_method_used_to_seal_the_package',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/Primary_method_used_to_seal_the_package'],

    ['traceability_integration',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/Traceability_Integration']
  ]);

  mapTextFields([
    ['is_packaging_designed_to_protect_product_from_moisture',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_the_packaging_des_roduct_from_moisture'],

    ['is_packaging_designed_to_protect_product_from_oxygen',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_the_packaging_des_product_from_oxygen'],

    ['is_packaging_designed_to_protect_product_from_light',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_the_packaging_des_e_product_from_light'],

    ['is_packaging_designed_for_high_fat_products',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_the_packaging_res_th_high_fat_products'],

    ['is_any_packaging_material_specified',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/group_xv65w58/Is_any_packaging_material_spec'],

    ['vulnerability_to_rancidity_lipid_oxidation',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/Vulnerability_to_Ran_ty_Lipid_Oxidation']
  ]);

  mapArray('has_the_suitability_tested_with_the_product',
    'group_vz9uu61/group_rc6ev70/group_dj46v51/Has_the_suitability_ted_with_the_product');

  mapTextFields([
    ['other_packaging_type',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/Other_type_of_packag_the_finished_product'],

    ['other_packaging_material',
      'group_vz9uu61/group_rc6ev70/group_dj46v51/packaging_laminate_other_specify'],

    ['other_quality_control_infrastructure',
      'group_vz9uu61/group_rc6ev70/Specify_other_qualit_sting_Infrastructure'],

    ['other_external_specialized_testing',
      'group_vz9uu61/group_rc6ev70/External_Specialized_Testing_Utilization_other_specify']
  ]);

  // -------------------------------------------------------
  // 13. Distribution
  // -------------------------------------------------------

  mapArrayFields([
    ['distribution_channels',
      'group_pg1io48/_6_1_Distribution_Channels_Place'],

    ['geographic_distribution_scope',
      'group_pg1io48/_6_1_1_Geographic_Distribution_Scope']
  ]);

  mapText('packaging_supply_constraints',
    'group_pg1io48/_6_6_Packaging_supply_constraints');

  // -------------------------------------------------------
  // 14. Retail products
  // -------------------------------------------------------

  const retailFields = [
    ['retail_product_1_price',
      'group_pg1io48/group_wg2bc77/retail_product_1_group/_6_2_1_Retail_Price_per_Pack_TZS'],

    ['retail_product_1_weight',
      'group_pg1io48/group_wg2bc77/retail_product_1_group/_6_2_2_Net_Weight_per_Unit'],

    ['retail_product_1_cost_50g_kg',
      'group_pg1io48/group_wg2bc77/retail_product_1_group/retail_product_1_cost_50g_kg'],

    ['retail_product_2_price',
      'group_pg1io48/group_wg2bc77/retail_product_2_group/retail_product_2_price'],

    ['retail_product_2_weight',
      'group_pg1io48/group_wg2bc77/retail_product_2_group/retail_product_2_weight'],

    ['retail_product_2_cost_50g_kg',
      'group_pg1io48/group_wg2bc77/retail_product_2_group/retail_product_2_cost_50g_kg'],

    ['retail_product_3_price',
      'group_pg1io48/group_wg2bc77/retail_product_3_group/retail_product_3_price'],

    ['retail_product_3_weight',
      'group_pg1io48/group_wg2bc77/retail_product_3_group/retail_product_3_weight'],

    ['retail_product_3_cost_50g_kg',
      'group_pg1io48/group_wg2bc77/retail_product_3_group/retail_product_3_cost_50g_kg']
  ];

  mapNumberFields(retailFields);

  mapTextFields([
    ['retail_product_1_unit',
      'group_pg1io48/group_wg2bc77/retail_product_1_group/_6_2_3_Net_weight_unit'],

    ['retail_product_2_unit',
      'group_pg1io48/group_wg2bc77/retail_product_2_group/retail_product_2_unit'],

    ['retail_product_3_unit',
      'group_pg1io48/group_wg2bc77/retail_product_3_group/retail_product_3_unit']
  ]);

  // -------------------------------------------------------
  // 15. Workforce and financial inclusion
  // -------------------------------------------------------

  mapInteger('number_of_employees',
    'group_mu73u63/group_oe5kd34/_7_3_5_Total_Workforce');

  mapInteger('permanent_male_employees',
    'group_mu73u63/group_oe5kd34/_7_3_1_Permanent_Male_Employees');

  mapInteger('permanent_female_employees',
    'group_mu73u63/group_oe5kd34/_7_3_2_Permanent_Female_Employees');

  mapInteger('casual_male_employees',
    'group_mu73u63/group_oe5kd34/_7_3_3_Casual_Male_Employees');

  mapInteger('casual_female_employees',
    'group_mu73u63/group_oe5kd34/_7_3_4_Casual_Female_Employees');

  mapArray('financial_inclusiveness_infrastructure',
    'group_mu73u63/_7_4_Financial_Inclus_iness_Infrastructure');

  mapTextFields([
    ['specify_financial_inclusiveness_infrastructure',
      'group_mu73u63/Specify_Financial_In_iness_Infrastructure'],

    ['financial_remarks', 'group_mu73u63/remarks_group_mu73u63'],

    ['innovation_awareness',
      'group_nw4oo06/Do_you_know_any_othe_a_groundnuts_senene'],

    ['innovation_remarks', 'group_nw4oo06/remarks_group_nw4oo06']
  ]);

  // -------------------------------------------------------
  // 16. Dynamic packaging compliance fields
  // -------------------------------------------------------

  const packagingCompliancePrefix =
    'group_pg1io48/packaging_labelling_compliance/';

  for (const [key, value] of Object.entries(data || {})) {
    if (
      key.startsWith(packagingCompliancePrefix) &&
      key.endsWith('_status') &&
      !isEmpty(value)
    ) {
      const suffix = key
        .slice(packagingCompliancePrefix.length)
        .replace(/_status$/, '');

      const column = `packaging_compliance_${suffix}`;

      // Only set the value if this column exists in the model.
      // The revised model below includes the existing compliance columns.
      payload[column] = toText(value);
    }
  }

  // -------------------------------------------------------
  // 17. GPS coordinates
  // -------------------------------------------------------

  let latitude;
  let longitude;

  if (Array.isArray(data?._geolocation)) {
    latitude = toNumber(data._geolocation[0]);
    longitude = toNumber(data._geolocation[1]);
  }

  // Kobo may also provide coordinates as a string.
  if (latitude === undefined || longitude === undefined) {
    const coordinateValue = getRawValue(
      'group_tt2fr91/_1_2_Coordinate_location'
    );

    if (coordinateValue) {
      const coordinates = Array.isArray(coordinateValue)
        ? coordinateValue
        : String(coordinateValue).trim().split(/\s+/);

      latitude = toNumber(coordinates[0]);
      longitude = toNumber(coordinates[1]);
    }
  }

  if (latitude !== undefined) payload.latitude = latitude;
  if (longitude !== undefined) payload.longitude = longitude;

  // -------------------------------------------------------
  // 18. Download Kobo attachments
  // -------------------------------------------------------

  console.log('Downloading producer photographs and attachments...');

  payload.attachments = await downloadKoboImages(data);

  console.log('Finished downloading Kobo attachments.');

  // -------------------------------------------------------
  // 19. Validate required fields
  // -------------------------------------------------------

  const errors = [];

  if (!payload.business_name) {
    errors.push('Business name is missing');
  }

  if (!payload.region) {
    errors.push('Region is missing');
  }

  if (!payload.district) {
    errors.push('District is missing');
  }

  if (!payload.ward) {
    errors.push('Ward is missing');
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

  if (errors.length) {
    const error = new Error(errors.join('; '));
    error.status = 422;
    error.details = errors;
    throw error;
  }

  try {
    console.log('Validated producer payload:', {
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

    const surveyPayload = {
      producer_id: producer.id,
      kobotoolbox_submission_id: String(data?._id ?? ''),
      enumerator: toText(
        getRawValue('group_tt2fr91/Enumerator_s_name')
      ),
      data_stream_source: toText(
        getRawValue('group_tt2fr91/Data_Stream_Source')
      )
    };

    await db.survey.create(surveyPayload);

    // console.log('Created Producer:', producer);
    // console.log('Created Producer registration_type:', producer.registration_type);

    return producer;
  } catch (error) {
    console.error('Error creating producer from Kobo submission:', error);
    throw error;
  }
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
