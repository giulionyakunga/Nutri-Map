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

      first_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      middle_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      last_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      registration_type: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      ownership_structure: { type: Sequelize.STRING(150), allowNull: true }, 
    
      organization_type: {
        type: Sequelize.STRING(50),
        allowNull: true
      },

      business_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      tin: {
        type: Sequelize.STRING(50),
        allowNull: true
      },

      contact_person: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      phone: {
        type: Sequelize.STRING(30),
        allowNull: true
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      region: { type: DataTypes.STRING(500), allowNull: false },
      district: { type: DataTypes.STRING(500), allowNull: false },
      ward: { type: DataTypes.STRING(500), allowNull: false },

      physical_address: {
        type: Sequelize.STRING(500),
        allowNull: false
      },

      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },

      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },

      location: {
        type: Sequelize.GEOMETRY('POINT', 4326),
        allowNull: true
      },

      production_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      daily_output: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      number_of_employees: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      verification_status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'pending_field_validation'
      },

      source: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      status: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'active'
      },

      created_by: {
        type: DataTypes.STRING(150), allowNull: true
      },
      position_role: { type: DataTypes.STRING(150), allowNull: true },
      brela_registration_number: { type: DataTypes.STRING(50), allowNull: true },
      tbs_zfda_registration_number: { type: DataTypes.STRING(50), allowNull: true },
      sido_registration_number: { type: DataTypes.STRING(50), allowNull: true },
      operational_scale: { type: DataTypes.STRING(100), allowNull: true },
      operational_status: { type: DataTypes.STRING(100), allowNull: true },
      primary_raw_materials: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      primary_sourcing_channels: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
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