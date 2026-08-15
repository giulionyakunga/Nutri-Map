module.exports = (sequelize, DataTypes) => {
  const Certification = sequelize.define(
    'certification',
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
      certification_type: { type: DataTypes.STRING(100), allowNull: false },
      issuing_authority: { type: DataTypes.STRING(150), allowNull: false },
      certificate_number: { type: DataTypes.STRING(150), allowNull: true },
      issue_date: { type: DataTypes.DATEONLY, allowNull: true },
      expiry_date: { type: DataTypes.DATEONLY, allowNull: true },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'active',
        validate: { isIn: [['active', 'expired', 'revoked', 'pending']] }
      }
    },
    {
      tableName: 'certifications',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  Certification.associate = (models) => {
    Certification.belongsTo(models.producer, { foreignKey: 'producer_id' });
  };

  return Certification;
};
