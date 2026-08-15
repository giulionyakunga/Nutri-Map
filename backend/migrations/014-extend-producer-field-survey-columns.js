'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('producers', 'district_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'districts', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    await queryInterface.changeColumn('producers', 'ward_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'wards', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    await queryInterface.changeColumn('producers', 'production_capacity', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn('producers', 'daily_output', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn('producers', 'number_of_employees', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn('producers', 'registration_type', {
      type: Sequelize.STRING(30),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'ownership_structure', {
      type: Sequelize.STRING(150),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'position_role', {
      type: Sequelize.STRING(150),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'brela_registration_number', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'tbs_zfda_registration_number', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'sido_registration_number', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'operational_scale', {
      type: Sequelize.STRING(100),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'operational_status', {
      type: Sequelize.STRING(100),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'primary_raw_materials', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'primary_sourcing_channels', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'shortage_months', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'post_harvest_loss_percent', {
      type: Sequelize.DOUBLE,
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'storage_capacity', {
      type: Sequelize.DOUBLE,
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'storage_capacity_unit', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'main_storage_challenges', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'nutrient_dense_crops', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'total_area_harvest_scale', {
      type: Sequelize.DOUBLE,
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'area_harvest_unit', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'average_yield', {
      type: Sequelize.DOUBLE,
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'yield_unit', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'harvest_cycles_per_year', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'proximity_major_road_km', {
      type: Sequelize.DOUBLE,
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'proximity_market_km', {
      type: Sequelize.DOUBLE,
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'accessibility_status', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'infrastructure_status', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'sanitary_status', {
      type: Sequelize.STRING(50),
      allowNull: true
    });

    await queryInterface.addColumn('producers', 'data_status', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'production'
    });
  },

  async down(queryInterface) {
    const columns = [
      'position_role', 'brela_registration_number', 'tbs_zfda_registration_number',
      'sido_registration_number', 'operational_scale', 'operational_status',
      'primary_raw_materials', 'primary_sourcing_channels', 'shortage_months',
      'post_harvest_loss_percent', 'storage_capacity', 'storage_capacity_unit',
      'main_storage_challenges', 'nutrient_dense_crops', 'total_area_harvest_scale',
      'area_harvest_unit', 'average_yield', 'yield_unit', 'harvest_cycles_per_year',
      'proximity_major_road_km', 'proximity_market_km', 'accessibility_status',
      'infrastructure_status', 'sanitary_status', 'data_status'
    ];
    for (const column of columns) {
      await queryInterface.removeColumn('producers', column);
    }
  }
};
