module.exports = (sequelize, DataTypes) => {

  // -------------------------------------------------------
  // Reusable Sequelize field definitions
  // -------------------------------------------------------

  const S = (length = 255) => ({
    type: DataTypes.STRING(length),
    allowNull: true
  });

  const T = () => ({
    type: DataTypes.TEXT,
    allowNull: true
  });

  const A = () => ({
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  });

  const N = () => ({
    type: DataTypes.DOUBLE,
    allowNull: true,
    validate: { min: 0 }
  });

  const I = () => ({
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 0 }
  });

  // -------------------------------------------------------
  // Fields stored as STRING
  // -------------------------------------------------------

  const stringFields = [
    'first_name',
    'middle_name',
    'last_name',
    'registration_type_other',
    'business_owner',
    'business_owner_email',
    'organization_type',
    'business_name',
    'tin',
    'contact_person',
    'phone',
    'email',
    'region',
    'district',
    'ward',
    'street',
    'physical_address',

    'machinery_grade_and_processing_setup',
    'nutritional_fact_panel_nfp',
    'nutritional_fact_panel_general',
    'has_laboratory_molar_on_finished_product',
    'recommended_frequency_of_consumption',

    'tbs_certification_tanzania_business',
    'zfda_registration_z_food_and_drug_agency',
    'sectoral_regulatory_board_milk_board',
    'tbs_expiry_date',
    'incubation_status',
    'nd_batch_record_logs',

    'is_packaging_designed_to_protect_product_from_moisture',
    'is_packaging_designed_to_protect_product_from_oxygen',
    'is_packaging_designed_to_protect_product_from_light',
    'is_packaging_designed_for_high_fat_products',
    'is_any_packaging_material_specified',
    'vulnerability_to_rancidity_lipid_oxidation',

    'legal_pass',
    'scope_pass',
    'additive_pass',
    'eligibility_pass',

    'applicable_tiers',
    'zanzibar_general_trade_thresholds',
    'selection_tier',

    'adequate_warehouse_storage_available',
    'storage_facilities_details',
    'functional_dis_logistics_available',

    'harvest_cycles_per_year',
    'other_seed_source',
    'other_agricultural_practice',
    'other_drying_method',
    'unit_total_harvest_amount',
    'specify_other_harvest_unit',
    'unit_amount_lost_or_spoiled',
    'other_unit_lost_or_spoiled',
    'other_post_harvest_loss_cause',
    'other_buyers_of_produce',
    'selling_price_unit',
    'farmer_harvester_ownership_other',

    'age_market',
    'upf_share',
    'free_from_additives',
    'formulation',
    'sme_upf_scoring',
    'certification',
    'ssop_logs',
    'equipment',
    'qualified_staff',
    'sourcing',
    'logistics',
    'sme_assessment_region',
    'sme_financial_band',
    'management',
    'records',
    'willingness',
    'female_owner',
    'youth_owner',
    'female_workforce',
    'women_suppliers',

    'operational_scale',
    'operational_status',

    'retail_product_1_unit',
    'retail_product_2_unit',
    'retail_product_3_unit',

    'position_role',
    'brela_registration_number',
    'tbs_zfda_registration_number',
    'sido_registration_number',

    'data_status',
    'verification_status',
    'status',
    'source',
    'created_by',

    'enterprise_company_select',
    'survey_date',
    'landmark',
    'landmark_response_method',

    'commercial_product_1',
    'commercial_product_2',
    'commercial_product_3',

    'quantity_stored_unit',
    'unit_lost_or_spoiled',
    'main_storage_capacity_unit',

    'other_finished_product_categories',
    'other_equipment',
    'other_facility_type',
    'other_processing_pre_treatment',
    'processing_remarks',
    'nutrition_remarks',

    'if_full_certified_state_the_standard',
    'if_full_certified_state_the_standard_other',
    'other_quality_control_infrastructure',
    'other_external_specialized_testing',
    'other_packaging_type',
    'other_packaging_material',

    'specify_financial_inclusiveness_infrastructure',
    'innovation_awareness'
  ];

  // -------------------------------------------------------
  // Fields stored as ARRAY(STRING)
  // These are Kobo select_multiple or multi-value fields.
  // -------------------------------------------------------

  const arrayFields = [
    'registration_type',
    'ownership_structure',

    'equipment_installed',
    'facility_type',
    'processing_pre_t_i_nutrient_reduction',
    'finished_product_categories',

    'polyunsaturated_fatty_acids',
    'pro_vitamin_a_biofortification_source',

    'quality_control_infrastructure',
    'quality_control_testing_protocols',
    'external_specialized_testing_utilization',

    'type_of_packaging_currently_used',
    'packaging_material',
    'has_the_suitability_tested_with_the_product',
    'primary_method_used_to_seal_the_package',
    'traceability_integration',

    'distribution_channels',
    'geographic_distribution_scope',

    'commercial_brand_names',

    'main_storage_challenges',
    'nutrient_dense_crops',
    'source_of_seed_material',
    'good_agricultural_practices',
    'drying_method',
    'main_causes_post_harvest_loss',
    'buyers_of_produce',
    'payment_terms',
    'farmer_harvester_ownership_status',

    'product_types',
    'primary_raw_materials',
    'primary_sourcing_channels',
    'shortage_months',

    'certification_statuses',

    'financial_inclusiveness_infrastructure'
  ];

  // -------------------------------------------------------
  // Fields stored as DOUBLE
  // -------------------------------------------------------

  const numberFields = [
    'production_capacity',
    'production_capacity_ton_month',
    'actual_operational_output_ton_month',

    'total_energy_density',
    'crude_protein_content',
    'total_crude_fat',
    'total_carbohydrates',
    'crude_fiber_target',
    'moisture_content',
    'iodine_content',
    'folate_content',

    'iron_content',
    'zinc_content',
    'vitamin_a_content',
    'calcium_content',

    'phytate_to_iron_molar_ratio',
    'phytate_to_zinc_molar_ratio',
    'tannin_content',

    'total_quantity_required_per_season_month',
    'quantity_handled_stored_high_season',
    'quantity_handled_stored_low_season',
    'quantity_lost_or_spoiled',

    'total_area_crops_cultivated',
    'total_area_harvested',
    'ropes_for_seaweed_harvested',
    'amount_of_seaweed_harvested',
    'average_crop_yield_per_harvest',
    'total_harvest_amount',
    'amount_lost_or_spoiled',

    'average_selling_price_per_unit',

    'turnover_tzs',
    'capacity_mt',

    'retail_product_1_price',
    'retail_product_1_weight',
    'retail_product_1_cost_50g_kg',

    'retail_product_2_price',
    'retail_product_2_weight',
    'retail_product_2_cost_50g_kg',

    'retail_product_3_price',
    'retail_product_3_weight',
    'retail_product_3_cost_50g_kg',

    'post_harvest_loss_percent',
    'storage_capacity',
    'total_area_harvest_scale',
    'average_yield',
    'proximity_major_road_km',
    'proximity_market_km',

    'percentage_score',
    'nutrition_score',
    'safety_score',
    'technical_score',
    'supply_score',
    'financial_score',
    'management_score',
    'equity_score'
  ];

  // -------------------------------------------------------
  // Fields stored as INTEGER
  // -------------------------------------------------------

  const integerFields = [
    'number_of_boats_for_dagaa',
    'number_of_employees',
    'permanent_male_employees',
    'permanent_female_employees',
    'casual_male_employees',
    'casual_female_employees',
    'equity_count'
  ];

  // -------------------------------------------------------
  // Fields stored as TEXT
  // -------------------------------------------------------

  const textFields = [
    'ingredients',
    'top_three_production_challenges',
    'remarks_sme_screening',
    'financial_remarks',
    'innovation_remarks',
    'ownership_structure_other'
  ];

  // -------------------------------------------------------
  // Build attributes from the field groups
  // -------------------------------------------------------

  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    ...Object.fromEntries(
      stringFields.map(field => [field, S()])
    ),

    ...Object.fromEntries(
      arrayFields.map(field => [field, A()])
    ),

    ...Object.fromEntries(
      numberFields.map(field => [field, N()])
    ),

    ...Object.fromEntries(
      integerFields.map(field => [field, I()])
    ),

    ...Object.fromEntries(
      textFields.map(field => [field, T()])
    ),

    // -----------------------------------------------------
    // Contact and registration fields with specific lengths
    // -----------------------------------------------------

    business_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },

    tin: S(50),
    phone: S(30),
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isEmail: true }
    },
    business_owner_email: S(255),

    region: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    district: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    ward: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    street: S(500),
    physical_address: S(500),

    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: { min: -90, max: 90 }
    },

    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: { min: -180, max: 180 }
    },

    location: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true
    },

    // -----------------------------------------------------
    // Fields with specific validation/defaults
    // -----------------------------------------------------

    number_of_employees: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0 }
    },

    verification_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'pending_field_validation',
      validate: {
        isIn: [[
          'pending_field_validation',
          'field_validated',
          'rejected',
          'needs_review'
        ]]
      }
    },

    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'active',
      validate: {
        isIn: [['active', 'inactive']]
      }
    },

    source: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    created_by: {
      type: DataTypes.STRING(150),
      allowNull: true
    },

    organization_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        isIn: [[
          null,
          'company',
          'cooperative',
          'farmer_group',
          'youth_group',
          'women_group'
        ]]
      }
    },

    percentage_score: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: { min: 0, max: 100 }
    },

    post_harvest_loss_percent: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: { min: 0, max: 100 }
    },

    storage_capacity: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: { min: 0 }
    },

    total_area_harvest_scale: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: { min: 0 }
    },

    average_yield: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: { min: 0 }
    },

    proximity_major_road_km: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: { min: 0 }
    },

    proximity_market_km: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: { min: 0 }
    },

    data_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'production',
      validate: {
        isIn: [['production', 'hypothetical_testing']]
      }
    },

    // -----------------------------------------------------
    // Packaging compliance fields from the existing model
    // -----------------------------------------------------

    packaging_compliance_group_ga2fx66_row_11: S(20),
    packaging_compliance_group_ga2fx66_row_1: S(20),
    packaging_compliance_group_ga2fx66_row_3: S(20),
    packaging_compliance_group_ga2fx66_row_9: S(20),
    packaging_compliance_group_ga2fx66_row_14: S(20),
    packaging_compliance_group_ga2fx66_row_12: S(20),
    packaging_compliance_group_ga2fx66_row_4: S(20),
    packaging_compliance_group_ga2fx66_row_7: S(20),
    packaging_compliance_group_ga2fx66_row_16: S(20),
    packaging_compliance_group_ga2fx66_row: S(20),
    packaging_compliance_group_ga2fx66_row_8: S(20),
    packaging_compliance_group_ga2fx66_row_5: S(20),
    packaging_compliance_group_ga2fx66_row_10: S(20),
    packaging_compliance_group_ga2fx66_row_15: S(20),
    packaging_compliance_group_ga2fx66_row_13: S(20),
    packaging_compliance_group_ga2fx66_row_2: S(20),
    packaging_compliance_group_ga2fx66_row_6: S(20),

    attachments: A(),

    // Additional fields used by the revised create method
    survey_date: {
      type: DataTypes.DATE,
      allowNull: true
    },

    landmark: S(500),
    landmark_response_method: S(50),

    commercial_product_1: S(255),
    commercial_product_2: S(255),
    commercial_product_3: S(255),

    other_finished_product_categories: T(),
    other_equipment: T(),
    other_facility_type: T(),
    other_processing_pre_treatment: T(),
    processing_remarks: T(),
    nutrition_remarks: T(),

    if_full_certified_state_the_standard: T(),
    if_full_certified_state_the_standard_other: T(),
    other_quality_control_infrastructure: T(),
    other_external_specialized_testing: T(),
    other_packaging_type: T(),
    other_packaging_material: T(),

    phytate_to_iron_molar_ratio: N(),
    phytate_to_zinc_molar_ratio: N(),
    tannin_content: N()
  };

  const Producer = sequelize.define(
    'producer',
    attributes,
    {
      tableName: 'producers',
      underscored: true,

      createdAt: 'created_at',
      updatedAt: 'updated_at',

      hooks: {
        beforeValidate: (producer) => {
          if (
            producer.latitude !== undefined &&
            producer.latitude !== null &&
            producer.longitude !== undefined &&
            producer.longitude !== null
          ) {
            producer.location = {
              type: 'Point',
              coordinates: [
                producer.longitude,
                producer.latitude
              ]
            };
          }
        }
      }
    }
  );

  Producer.associate = (models) => {
    Producer.belongsTo(models.user, {
      foreignKey: 'created_by',
      as: 'creator'
    });

    Producer.hasMany(models.product, {
      foreignKey: 'producer_id',
      onDelete: 'CASCADE'
    });

    Producer.hasMany(models.certification, {
      foreignKey: 'producer_id',
      onDelete: 'CASCADE'
    });

    Producer.hasMany(models.survey, {
      foreignKey: 'producer_id',
      onDelete: 'CASCADE'
    });
  };

  return Producer;
};