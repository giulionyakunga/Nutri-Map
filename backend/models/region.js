module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define(
    'region',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'Tanzania'
      },
      boundary: {
        type: DataTypes.GEOMETRY('MULTIPOLYGON', 4326),
        allowNull: true
      }
    },
    {
      tableName: 'regions',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  Region.associate = (models) => {
    Region.hasMany(models.district, { foreignKey: 'region_id' });
    Region.hasMany(models.producer, { foreignKey: 'region_id' });
  };

  return Region;
};
