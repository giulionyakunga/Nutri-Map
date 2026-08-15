module.exports = (sequelize, DataTypes) => {
  const Producer = sequelize.define(
    'producer',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      first_name: { type: DataTypes.STRING(100), allowNull: true },
      middle_name: { type: DataTypes.STRING(100), allowNull: true },
      last_name: { type: DataTypes.STRING(100), allowNull: true },
      registration_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: { isIn: [[null, 'formal', 'informal']] }
      },
      ownership_structure: { type: DataTypes.STRING(150), allowNull: true },
      organization_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: { isIn: [[null, 'company', 'cooperative', 'farmer_group', 'youth_group', 'women_group']] }
      },
      business_name: { type: DataTypes.STRING(255), allowNull: true },
      tin: { type: DataTypes.STRING(50), allowNull: true },
      contact_person: { type: DataTypes.STRING(255), allowNull: true },
      phone: { type: DataTypes.STRING(30), allowNull: true },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: { isEmail: true }
      },
      region_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'regions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'districts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      ward_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'wards', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      physical_address: { type: DataTypes.STRING(500), allowNull: false },
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
      production_capacity: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 0 } },
      daily_output: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 0 } },
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
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
      }
    },
    {
      tableName: 'producers',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeValidate: (producer) => {
          if (producer.latitude !== undefined && producer.longitude !== undefined) {
            producer.location = {
              type: 'Point',
              coordinates: [producer.longitude, producer.latitude]
            };
          }
        }
      }
    }
  );

  Producer.associate = (models) => {
    Producer.belongsTo(models.region, { foreignKey: 'region_id' });
    Producer.belongsTo(models.district, { foreignKey: 'district_id' });
    Producer.belongsTo(models.ward, { foreignKey: 'ward_id' });
    Producer.belongsTo(models.user, { foreignKey: 'created_by', as: 'creator' });
    Producer.hasMany(models.product, { foreignKey: 'producer_id', onDelete: 'CASCADE' });
    Producer.hasMany(models.certification, { foreignKey: 'producer_id', onDelete: 'CASCADE' });
    Producer.hasMany(models.survey, { foreignKey: 'producer_id', onDelete: 'CASCADE' });
  };

  return Producer;
};
