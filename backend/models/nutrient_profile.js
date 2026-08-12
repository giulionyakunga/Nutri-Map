module.exports = (sequelize, DataTypes) => {
  const NutrientProfile = sequelize.define(
    'nutrient_profile',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      protein: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      iron: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      zinc: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      vitamin_a: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      calcium: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      energy: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } },
      laboratory_verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      verification_date: { type: DataTypes.DATEONLY, allowNull: true }
    },
    {
      tableName: 'nutrient_profiles',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  NutrientProfile.associate = (models) => {
    NutrientProfile.belongsTo(models.product, { foreignKey: 'product_id' });
  };

  return NutrientProfile;
};
