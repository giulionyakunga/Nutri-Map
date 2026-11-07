'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const DataTypes = Sequelize.DataTypes;

    await queryInterface.createTable('producers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },


      first_name: { type: DataTypes.STRING(100), allowNull: true },
      middle_name: { type: DataTypes.STRING(100), allowNull: true },
      last_name: { type: DataTypes.STRING(100), allowNull: true },
      
      registration_type: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      registration_type_other: { type: DataTypes.STRING(255), allowNull: true },

      ownership_structure: { type: DataTypes.STRING(150), allowNull: true },
      business_owner: { type: DataTypes.STRING(150), allowNull: true },
      business_owner_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      organization_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: { isIn: [[null, 'company', 'cooperative', 'farmer_group', 'youth_group', 'women_group']] }
      },
      business_name: { 
        type: DataTypes.STRING(255), 
        allowNull: true,
        unique: true,
      },
      tin: { type: DataTypes.STRING(50), allowNull: true },
      contact_person: { type: DataTypes.STRING(255), allowNull: true },
      phone: { type: DataTypes.STRING(30), allowNull: true },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: { isEmail: true }
      },
      region: { type: DataTypes.STRING(50), allowNull: false },
      district: { type: DataTypes.STRING(50), allowNull: false },
      ward: { type: DataTypes.STRING(50), allowNull: false },
      street: { type: DataTypes.STRING(500), allowNull: true },
      physical_address: { type: DataTypes.STRING(500), allowNull: true },
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
      location: { type: DataTypes.GEOMETRY('POINT', 4326), allowNull: true },
      production_capacity: { type: DataTypes.STRING(50), allowNull: true, validate: { min: 0 } },
      production_capacity_ton_month: { type: DataTypes.STRING(50), allowNull: true, validate: { min: 0 } },
      actual_operational_output_ton_month: { type: DataTypes.STRING(50), allowNull: true, validate: { min: 0 } },
      machinery_grade_and_processing_setup: { type: DataTypes.STRING(100), allowNull: true },
      equipment_installed: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      facility_type: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      processing_pre_t_i_nutrient_reduction: { type: DataTypes.STRING(100), allowNull: true },
      nutritional_fact_panel_nfp: { type: DataTypes.STRING(100), allowNull: true },
      total_energy_density: { type: DataTypes.DOUBLE, allowNull: true },
      crude_protein_content: { type: DataTypes.DOUBLE, allowNull: true },
      total_crude_fat: { type: DataTypes.DOUBLE, allowNull: true },
      total_carbohydrates: { type: DataTypes.DOUBLE, allowNull: true },
      crude_fiber_target: { type: DataTypes.DOUBLE, allowNull: true },
      moisture_content: { type: DataTypes.DOUBLE, allowNull: true },
      iodine_content: { type: DataTypes.DOUBLE, allowNull: true },
      folate_content: { type: DataTypes.DOUBLE, allowNull: true },
      polyunsaturated_fatty_acids: { type: DataTypes.STRING(100), allowNull: true },
      pro_vitamin_a_biofortification_source: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      has_laboratory_molar_on_finished_product: { type: DataTypes.STRING(10), allowNull: true },
      recommended_frequency_of_consumption: { type: DataTypes.STRING(20), allowNull: true },
      tbs_certification_tanzania_business: { type: DataTypes.STRING(100), allowNull: true },
      if_full_certified_state_the_standard: { type: DataTypes.STRING(100), allowNull: true },
      zfda_registration_z_food_and_drug_agency: { type: DataTypes.STRING(100), allowNull: true },
      sectoral_regulatory_board_milk_board: { type: DataTypes.STRING(100), allowNull: true },
      tbs_expiry_date: { type: DataTypes.STRING(20), allowNull: true },
      incubation_status: { type: DataTypes.STRING(100), allowNull: true },
      nd_batch_record_logs: { type: DataTypes.STRING(100), allowNull: true },
      quality_control_infrastructure: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    
      quality_control_testing_protocols: { type: DataTypes.STRING(500), allowNull: true },
      external_specialized_testing_utilization: { type: DataTypes.STRING(100), allowNull: true },
      type_of_packaging_currently_used: { type: DataTypes.STRING(100), allowNull: true },
      packaging_material: { type: DataTypes.STRING(100), allowNull: true },
      is_packaging_designed_to_protect_product_from_moisture: { type: DataTypes.STRING(20), allowNull: true },
      is_packaging_designed_to_protect_product_from_oxygen: { type: DataTypes.STRING(20), allowNull: true },
      is_packaging_designed_to_protect_product_from_light: { type: DataTypes.STRING(20), allowNull: true },
      is_packaging_designed_for_high_fat_products: { type: DataTypes.STRING(20), allowNull: true },
      is_any_packaging_material_specified: { type: DataTypes.STRING(20), allowNull: true },
      has_the_suitability_tested_with_the_product: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },

      primary_method_used_to_seal_the_package: { type: DataTypes.STRING(100), allowNull: true },
      vulnerability_to_rancidity_lipid_oxidation: { type: DataTypes.STRING(50), allowNull: true },
      traceability_integration: { type: DataTypes.STRING(100), allowNull: true },
      distribution_channels: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      geographic_distribution_scope: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },


// ---------------------------------------------------
// Additional SME screening fields
// ---------------------------------------------------

legal_pass: {
  type: DataTypes.STRING(10),
  allowNull: true
},

scope_pass: {
  type: DataTypes.STRING(10),
  allowNull: true
},

additive_pass: {
  type: DataTypes.STRING(10),
  allowNull: true
},

eligibility_pass: {
  type: DataTypes.STRING(10),
  allowNull: true
},

nutrition_score: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

safety_score: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

technical_score: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

supply_score: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

financial_score: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

management_score: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

equity_count: {
  type: DataTypes.INTEGER,
  allowNull: true
},

equity_score: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

applicable_tiers: { type: DataTypes.STRING(10), allowNull: true },

remarks_sme_screening: {
  type: DataTypes.TEXT,
  allowNull: true
},

zanzibar_general_trade_thresholds: {
  type: DataTypes.STRING(255),
  allowNull: true
},

// ---------------------------------------------------
// Additional production information
// ---------------------------------------------------

finished_product_categories: {
  type: DataTypes.STRING(255),
  allowNull: true
},

// ---------------------------------------------------
// Additional distribution information
// ---------------------------------------------------

packaging_supply_constraints: {
  type: DataTypes.STRING(255),
  allowNull: true
},

// ---------------------------------------------------
// Employee breakdown
// ---------------------------------------------------

permanent_male_employees: {
  type: DataTypes.INTEGER,
  allowNull: true
},

permanent_female_employees: {
  type: DataTypes.INTEGER,
  allowNull: true
},

casual_male_employees: {
  type: DataTypes.INTEGER,
  allowNull: true
},

casual_female_employees: {
  type: DataTypes.INTEGER,
  allowNull: true
},

financial_inclusiveness_infrastructure: {
  type: DataTypes.STRING(255),
  allowNull: true
},

specify_financial_inclusiveness_infrastructure: {
  type: DataTypes.STRING(255),
  allowNull: true
},



financial_remarks: {
  type: DataTypes.TEXT,
  allowNull: true
},

innovation_awareness: {
  type: DataTypes.STRING(100),
  allowNull: true
},

innovation_remarks: {
  type: DataTypes.TEXT,
  allowNull: true
},
ownership_structure_other: {
  type: DataTypes.TEXT,
  allowNull: true
},









// ---------------------------------------------------
// Additional enterprise and product information
// ---------------------------------------------------

ingredients: {
  type: DataTypes.TEXT,
  allowNull: true
},

commercial_brand_names: {
  type: DataTypes.ARRAY(DataTypes.STRING),
  allowNull: true
},

commercial_product_1: {
  type: DataTypes.STRING(255),
  allowNull: true
},

// ---------------------------------------------------
// Additional storage information
// ---------------------------------------------------

total_quantity_required_per_season_month: {
  type: DataTypes.STRING(50),
  allowNull: true
},

quantity_handled_stored_high_season: {
  type: DataTypes.STRING(50),
  allowNull: true
},

quantity_handled_stored_low_season: {
  type: DataTypes.STRING(50),
  allowNull: true
},


quantity_stored_unit: {
  type: DataTypes.STRING(50),
  allowNull: true
},

quantity_lost_or_spoiled: {
  type: DataTypes.STRING(100),
  allowNull: true
},

unit_lost_or_spoiled: {
  type: DataTypes.STRING(50),
  allowNull: true
},

main_storage_capacity_unit: {
  type: DataTypes.STRING(50),
  allowNull: true
},

// main_storage_challenges already exists in your model.
// Its type is ARRAY(DataTypes.STRING).

// ---------------------------------------------------
// Agricultural production information
// ---------------------------------------------------

total_area_crops_cultivated: {
  type: DataTypes.STRING(50),
  allowNull: true
},

total_area_harvested: {
  type: DataTypes.STRING(50),
  allowNull: true
},

ropes_for_seaweed_harvested: {
  type: DataTypes.STRING(50),
  allowNull: true
},

amount_of_seaweed_harvested: {
  type: DataTypes.STRING(50),
  allowNull: true
},

number_of_boats_for_dagaa: {
  type: DataTypes.STRING(50),
  allowNull: true
},

average_crop_yield_per_harvest: {
  type: DataTypes.STRING(50),
  allowNull: true
},

source_of_seed_material: {
  type: DataTypes.STRING(100),
  allowNull: true
},

other_seed_source: {
  type: DataTypes.STRING(255),
  allowNull: true
},

good_agricultural_practices: {
  type: DataTypes.STRING(255),
  allowNull: true
},

other_agricultural_practice: {
  type: DataTypes.STRING(255),
  allowNull: true
},

drying_method: {
  type: DataTypes.STRING(100),
  allowNull: true
},

other_drying_method: {
  type: DataTypes.STRING(255),
  allowNull: true
},

total_harvest_amount: {
  type: DataTypes.STRING(50),
  allowNull: true
},

unit_total_harvest_amount: {
  type: DataTypes.STRING(50),
  allowNull: true
},

specify_other_harvest_unit: {
  type: DataTypes.STRING(100),
  allowNull: true
},

amount_lost_or_spoiled: {
  type: DataTypes.STRING(50),
  allowNull: true
},

unit_amount_lost_or_spoiled: {
  type: DataTypes.STRING(50),
  allowNull: true
},

other_unit_lost_or_spoiled: {
  type: DataTypes.STRING(100),
  allowNull: true
},

main_causes_post_harvest_loss: {
  type: DataTypes.STRING(255),
  allowNull: true
},

other_post_harvest_loss_cause: {
  type: DataTypes.STRING(255),
  allowNull: true
},

buyers_of_produce: {
  type: DataTypes.STRING(255),
  allowNull: true
},

other_buyers_of_produce: {
  type: DataTypes.STRING(255),
  allowNull: true
},

average_selling_price_per_unit: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

selling_price_unit: {
  type: DataTypes.STRING(50),
  allowNull: true
},

payment_terms: {
  type: DataTypes.ARRAY(DataTypes.STRING),
  allowNull: true
},

farmer_harvester_ownership_status: {
  type: DataTypes.STRING(100),
  allowNull: true
},

farmer_harvester_ownership_other: {
  type: DataTypes.STRING(255),
  allowNull: true
},

top_three_production_challenges: { type: DataTypes.TEXT, allowNull: true },

// ---------------------------------------------------
// Additional nutritional information
// ---------------------------------------------------

iron_content: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

zinc_content: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

vitamin_a_content: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

calcium_content: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

// ---------------------------------------------------
// Retail product information
// ---------------------------------------------------

retail_product_1_price: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

retail_product_1_weight: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

retail_product_1_unit: {
  type: DataTypes.STRING(50),
  allowNull: true
},

retail_product_1_cost_50g_kg: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

retail_product_2_price: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

retail_product_2_weight: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

retail_product_2_unit: {
  type: DataTypes.STRING(50),
  allowNull: true
},

retail_product_2_cost_50g_kg: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

retail_product_3_price: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

retail_product_3_weight: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

retail_product_3_unit: {
  type: DataTypes.STRING(50),
  allowNull: true
},

retail_product_3_cost_50g_kg: {
  type: DataTypes.DOUBLE,
  allowNull: true
},

// ---------------------------------------------------
// Packaging compliance
// ---------------------------------------------------

packaging_compliance_group_ga2fx66_row_11: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_1: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_3: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_9: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_14: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_12: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_4: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_7: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_16: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_8: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_5: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_10: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_15: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_13: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_2: {
  type: DataTypes.STRING(20),
  allowNull: true
},

packaging_compliance_group_ga2fx66_row_6: {
  type: DataTypes.STRING(20),
  allowNull: true
},








attachments: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },  





      number_of_employees: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 0 } },
      verification_status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'pending_field_validation',
        validate: { isIn: [['pending_field_validation', 'field_validated', 'rejected', 'needs_review']] }
      },
      source: { type: DataTypes.STRING(100), allowNull: false },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'active',
        validate: { isIn: [['active', 'inactive']] }
      },
      created_by: {
        type: DataTypes.STRING(150), allowNull: true
      },
      position_role: { type: DataTypes.STRING(150), allowNull: true },
      brela_registration_number: { type: DataTypes.STRING(50), allowNull: true },
      tbs_zfda_registration_number: { type: DataTypes.STRING(50), allowNull: true },
      sido_registration_number: { type: DataTypes.STRING(50), allowNull: true },
      sectoral_regulatory_board_milk_board: { type: DataTypes.STRING(100), allowNull: true },
      operational_scale: { type: DataTypes.STRING(100), allowNull: true },
      operational_status: { type: DataTypes.STRING(100), allowNull: true },
      product_types: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },  
      age_market: { type: DataTypes.STRING(10), allowNull: true },
      upf_share: { type: DataTypes.STRING(10), allowNull: true },
      free_from_additives: { type: DataTypes.STRING(10), allowNull: true },
      formulation: { type: DataTypes.STRING(100), allowNull: true },
      certification: { type: DataTypes.STRING(100), allowNull: true },
      ssop_logs: { type: DataTypes.STRING(100), allowNull: true },
      sme_upf_scoring: { type: DataTypes.STRING(100), allowNull: true },
      equipment: { type: DataTypes.STRING(100), allowNull: true },
      qualified_staff: { type: DataTypes.STRING(100), allowNull: true },
      turnover_tzs: { type: DataTypes.STRING(100), allowNull: true },
      capacity_mt: { type: DataTypes.STRING(100), allowNull: true },
      sme_financial_band: { type: DataTypes.STRING(100), allowNull: true },
      management: { type: DataTypes.STRING(100), allowNull: true },
      records: { type: DataTypes.STRING(100), allowNull: true },
      willingness: { type: DataTypes.STRING(100), allowNull: true },
      female_owner: { type: DataTypes.STRING(100), allowNull: true },
      youth_owner: { type: DataTypes.STRING(100), allowNull: true },
      female_workforce: { type: DataTypes.STRING(100), allowNull: true },
      women_suppliers: { type: DataTypes.STRING(100), allowNull: true },
      selection_tier: { type: DataTypes.STRING(100), allowNull: true },
      sourcing: { type: DataTypes.STRING(100), allowNull: true },
      logistics: { type: DataTypes.STRING(100), allowNull: true },
      sme_assessment_region: { type: DataTypes.STRING(100), allowNull: true },
      primary_raw_materials: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      primary_sourcing_channels: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      adequate_warehouse_storage_available: { type: DataTypes.STRING(10), allowNull: true },
      storage_facilities_details: { type: DataTypes.STRING(100), allowNull: true },
      functional_dis_logistics_available: { type: DataTypes.STRING(100), allowNull: true },
      shortage_months: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      post_harvest_loss_percent: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0, max: 100 } },
      storage_capacity: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      storage_capacity_unit: { type: DataTypes.STRING(50), allowNull: true },
      main_storage_challenges: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      nutrient_dense_crops: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      total_area_harvest_scale: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      area_harvest_unit: { type: DataTypes.STRING(50), allowNull: true },
      average_yield: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      yield_unit: { type: DataTypes.STRING(50), allowNull: true },
      harvest_cycles_per_year: { type: DataTypes.STRING(50), allowNull: true },
      proximity_major_road_km: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      proximity_market_km: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      accessibility_status: { type: DataTypes.STRING(50), allowNull: true },
      infrastructure_status: { type: DataTypes.STRING(50), allowNull: true },
      sanitary_status: { type: DataTypes.STRING(50), allowNull: true },
      data_status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'production',
        validate: { isIn: [['production', 'hypothetical_testing']] }
      },

      percentage_score: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0, max: 100 } },

      
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('producers', ['tin']);

    await queryInterface.sequelize.query(`
      CREATE INDEX producers_location_gist_idx
      ON producers
      USING GIST (location);
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('producers');
  }
};