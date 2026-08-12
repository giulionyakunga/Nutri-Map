module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      producer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'producers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_name: { type: DataTypes.STRING(255), allowNull: false },
      category: { type: DataTypes.STRING(150), allowNull: true },
      processing_method: { type: DataTypes.STRING(255), allowNull: true },
      shelf_life: { type: DataTypes.STRING(100), allowNull: true },
      packaging_type: { type: DataTypes.STRING(150), allowNull: true },
      price_per_unit: { type: DataTypes.DOUBLE, allowNull: true, validate: { min: 0 } }
    },
    {
      tableName: 'products',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.producer, { foreignKey: 'producer_id' });
    Product.hasMany(models.raw_material, { foreignKey: 'product_id', onDelete: 'CASCADE' });
    Product.hasOne(models.nutrient_profile, { foreignKey: 'product_id', onDelete: 'CASCADE' });
  };

  return Product;
};
