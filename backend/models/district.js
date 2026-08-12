module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define(
    'district',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      region_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'regions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      boundary: {
        type: DataTypes.GEOMETRY('MULTIPOLYGON', 4326),
        allowNull: true
      }
    },
    {
      tableName: 'districts',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  District.associate = (models) => {
    District.belongsTo(models.region, { foreignKey: 'region_id' });
    District.hasMany(models.ward, { foreignKey: 'district_id' });
    District.hasMany(models.producer, { foreignKey: 'district_id' });
  };

  return District;
};
