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
        allowNull: false,
        unique: true
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'Tanzania'
      },
    },
    {
      tableName: 'regions',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Region;
};
