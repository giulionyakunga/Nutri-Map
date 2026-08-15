module.exports = (sequelize, DataTypes) => {
  const Ward = sequelize.define(
    'ward',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'districts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false
      }
    },
    {
      tableName: 'wards',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  Ward.associate = (models) => {
    Ward.belongsTo(models.district, { foreignKey: 'district_id' });
    Ward.hasMany(models.producer, { foreignKey: 'ward_id' });
  };

  return Ward;
};
