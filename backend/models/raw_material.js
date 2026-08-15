module.exports = (sequelize, DataTypes) => {
  const RawMaterial = sequelize.define(
    'raw_material',
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
      material_name: { type: DataTypes.STRING(255), allowNull: false },
      source_location: { type: DataTypes.STRING(255), allowNull: true },
      seasonality: { type: DataTypes.BOOLEAN, allowNull: true },
      availability: { type: DataTypes.STRING(100), allowNull: true }
    },
    {
      tableName: 'raw_materials',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  RawMaterial.associate = (models) => {
    RawMaterial.belongsTo(models.product, { foreignKey: 'product_id' });
  };

  return RawMaterial;
};
