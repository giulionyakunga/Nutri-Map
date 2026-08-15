module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    'refresh_token',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      token_hash: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      expires_at: { type: DataTypes.DATE, allowNull: false },
      revoked_at: { type: DataTypes.DATE, allowNull: true },
      user_agent: { type: DataTypes.STRING(255), allowNull: true },
      ip_address: { type: DataTypes.STRING(64), allowNull: true }
    },
    {
      tableName: 'refresh_tokens',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: false
    }
  );

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.user, { foreignKey: 'user_id' });
  };

  return RefreshToken;
};
