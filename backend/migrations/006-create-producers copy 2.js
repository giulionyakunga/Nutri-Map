'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const {
      STRING,
      TEXT,
      ARRAY,
      DOUBLE,
      INTEGER,
      DATE,
      GEOMETRY,
      BOOLEAN
    } = Sequelize;

    const nullableString = (length = 255) => ({
      type: STRING(length),
      allowNull: true
    });

    const nullableDouble = {
      type: DOUBLE,
      allowNull: true
    };

    const nullableInteger = {
      type: INTEGER,
      allowNull: true
    };

    const nullableText = {
      type: TEXT,
      allowNull: true
    };

    const nullableArray = {
      type: ARRAY(STRING),
      allowNull: true
    };

    // Fields defined as STRING in the Producer model.
    const stringFields = [
      'first_name', 'middle_name', 'last_name',
      'registration_type_other', 'business_owner',
      'business_owner_email', 'organization_type',
      'business_name', 'tin', 'contact_person', 'phone',
      'email', 'region', 'district', 'ward', 'street',
      'physical_address',

      'machinery_grade_and_processing_setup',
      'nutritional_fact_panel_nfp',
      'nutritional_fact_panel_general',
      'has_laboratory_molar_on_finished_product',
      'recommended_frequency_of_consumption',

      'tbs_certification_tanzania_business',
      'zfda_registration_z_food_and_drug_agency',
      'sectoral_regulatory_board_milk_board',
      'tbs_expiry_date', 'incubation_status',
      'nd_batch_record_logs',

      'is_packaging_designed_to_protect_product_from_moisture',
      'is_packaging_designed_to_protect_product_from_oxygen',
      'is_packaging_designed_to_protect_product_from_light',
      'is_packaging_designed_for_high_fat_products',
      'is_any_packaging_material_specified',
      'vulnerability_to_rancidity_lipid_oxidation',

      'legal_pass', 'scope_pass', 'additive_pass',
      'eligibility_pass', 'applicable_tiers',
      'zanzibar_general_trade_thresholds', 'selection_tier',

      'adequate_warehouse_storage_available',
      'storage_facilities_details',
      'functional_dis_logistics_available',

      'harvest_cycles_per_year', 'other_seed_source',
      'other_agricultural_practice', 'other_drying_method',
      'unit_total_harvest_amount', 'specify_other_harvest_unit',
      'unit_amount_lost_or_spoiled', 'other_unit_lost_or_spoiled',
      'other_post_harvest_loss_cause', 'other_buyers_of_produce',
      'selling_price_unit', 'farmer_harvester_ownership_other',

      'age_market', 'upf_share', 'free_from_additives',
      'formulation', 'sme_upf_scoring', 'certification',
      'ssop_logs', 'equipment', 'qualified_staff', 'sourcing',
      'logistics', 'sme_assessment_region', 'sme_financial_band',
      'management', 'records', 'willingness', 'female_owner',
      'youth_owner', 'female_workforce', 'women_suppliers',

      'operational_scale', 'operational_status',

      'retail_product_1_unit', 'retail_product_2_unit',
      'retail_product_3_unit',

      'position_role', 'brela_registration_number',
      'tbs_zfda_registration_number', 'sido_registration_number',

      'data_status', 'verification_status', 'status',
      'source', 'created_by',

      'enterprise_company_select',
      'landmark', 'landmark_response_method',

      'commercial_product_1', 'commercial_product_2',
      'commercial_product_3',

      'quantity_stored_unit', 'unit_lost_or_spoiled',
      'main_storage_capacity_unit',

      'other_finished_product_categories',
      'other_equipment', 'other_facility_type',
      'other_processing_pre_treatment',
      'processing_remarks', 'nutrition_remarks',

      'if_full_certified_state_the_standard_other',
      'other_quality_control_infrastructure',
      'other_external_specialized_testing',
      'other_packaging_type', 'other_packaging_material',

      'specify_financial_inclusiveness_infrastructure',
      'innovation_awareness'
    ];

    // Fields stored as ARRAY(STRING).
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
      'if_full_certified_state_the_standard',
      'financial_inclusiveness_infrastructure',
      'attachments'
    ];

    // Fields stored as DOUBLE.
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

    // Fields stored as INTEGER.
    const integerFields = [
      'number_of_boats_for_dagaa',
      'number_of_employees',
      'permanent_male_employees',
      'permanent_female_employees',
      'casual_male_employees',
      'casual_female_employees',
      'equity_count'
    ];

    // Fields stored as TEXT.
    const textFields = [
      'ingredients',
      'top_three_production_challenges',
      'remarks_sme_screening',
      'financial_remarks',
      'innovation_remarks',
      'ownership_structure_other'
    ];

    // Start building table columns.
    const columns = {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    };

    // Generate columns from field groups.
    stringFields.forEach(field => {
      columns[field] = nullableString();
    });

    arrayFields.forEach(field => {
      columns[field] = nullableArray;
    });

    numberFields.forEach(field => {
      columns[field] = nullableDouble;
    });

    integerFields.forEach(field => {
      columns[field] = nullableInteger;
    });

    textFields.forEach(field => {
      columns[field] = nullableText;
    });

    // Fields with specific lengths and constraints.
    Object.assign(columns, {
      business_name: {
        type: STRING(255),
        allowNull: true,
        unique: true
      },

      tin: nullableString(50),
      phone: nullableString(30),

      email: {
        type: STRING(255),
        allowNull: true
      },

      business_owner_email: nullableString(255),

      region: {
        type: STRING(100),
        allowNull: false
      },

      district: {
        type: STRING(100),
        allowNull: false
      },

      ward: {
        type: STRING(100),
        allowNull: false
      },

      street: nullableString(500),
      physical_address: nullableString(500),

      latitude: {
        type: DOUBLE,
        allowNull: false
      },

      longitude: {
        type: DOUBLE,
        allowNull: false
      },

      location: {
        type: GEOMETRY('POINT', 4326),
        allowNull: true
      },

      number_of_employees: {
        type: INTEGER,
        allowNull: true
      },

      verification_status: {
        type: STRING(50),
        allowNull: false,
        defaultValue: 'pending_field_validation'
      },

      status: {
        type: STRING(30),
        allowNull: false,
        defaultValue: 'active'
      },

      source: {
        type: STRING(100),
        allowNull: false
      },

      created_by: {
        type: STRING(150),
        allowNull: true
      },

      organization_type: {
        type: STRING(50),
        allowNull: true
      },

      percentage_score: {
        type: DOUBLE,
        allowNull: true
      },

      post_harvest_loss_percent: {
        type: DOUBLE,
        allowNull: true
      },

      storage_capacity: {
        type: DOUBLE,
        allowNull: true
      },

      total_area_harvest_scale: {
        type: DOUBLE,
        allowNull: true
      },

      average_yield: {
        type: DOUBLE,
        allowNull: true
      },

      proximity_major_road_km: {
        type: DOUBLE,
        allowNull: true
      },

      proximity_market_km: {
        type: DOUBLE,
        allowNull: true
      },

      data_status: {
        type: STRING(50),
        allowNull: false,
        defaultValue: 'production'
      },

      // Packaging compliance fields.
      packaging_compliance_group_ga2fx66_row_11: nullableString(20),
      packaging_compliance_group_ga2fx66_row_1: nullableString(20),
      packaging_compliance_group_ga2fx66_row_3: nullableString(20),
      packaging_compliance_group_ga2fx66_row_9: nullableString(20),
      packaging_compliance_group_ga2fx66_row_14: nullableString(20),
      packaging_compliance_group_ga2fx66_row_12: nullableString(20),
      packaging_compliance_group_ga2fx66_row_4: nullableString(20),
      packaging_compliance_group_ga2fx66_row_7: nullableString(20),
      packaging_compliance_group_ga2fx66_row_16: nullableString(20),
      packaging_compliance_group_ga2fx66_row: nullableString(20),
      packaging_compliance_group_ga2fx66_row_8: nullableString(20),
      packaging_compliance_group_ga2fx66_row_5: nullableString(20),
      packaging_compliance_group_ga2fx66_row_10: nullableString(20),
      packaging_compliance_group_ga2fx66_row_15: nullableString(20),
      packaging_compliance_group_ga2fx66_row_13: nullableString(20),
      packaging_compliance_group_ga2fx66_row_2: nullableString(20),
      packaging_compliance_group_ga2fx66_row_6: nullableString(20),

      survey_date: {
        type: DATE,
        allowNull: true
      },

      landmark: nullableString(500),
      landmark_response_method: nullableString(50),

      commercial_product_1: nullableString(255),
      commercial_product_2: nullableString(255),
      commercial_product_3: nullableString(255),

      other_finished_product_categories: nullableText,
      other_equipment: nullableText,
      other_facility_type: nullableText,
      other_processing_pre_treatment: nullableText,
      processing_remarks: nullableText,
      nutrition_remarks: nullableText,

      if_full_certified_state_the_standard_other: nullableText,
      other_quality_control_infrastructure: nullableText,
      other_external_specialized_testing: nullableText,
      other_packaging_type: nullableText,
      other_packaging_material: nullableText
    });

    await queryInterface.createTable('producers', columns);

    // Useful indexes for common searches.
    await queryInterface.addIndex('producers', ['business_name']);
    await queryInterface.addIndex('producers', ['region']);
    await queryInterface.addIndex('producers', ['district']);
    await queryInterface.addIndex('producers', ['ward']);
    await queryInterface.addIndex('producers', ['verification_status']);
    await queryInterface.addIndex('producers', ['status']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('producers');
  }
};
