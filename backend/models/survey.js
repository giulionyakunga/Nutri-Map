module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define(
    'survey',
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
      kobotoolbox_submission_id: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      survey_date: { type: DataTypes.DATEONLY, allowNull: true },
      enumerator: { type: DataTypes.STRING(255), allowNull: true },
      json_data: { type: DataTypes.JSONB, allowNull: true }
    },
    {
      tableName: 'surveys',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  Survey.associate = (models) => {
    Survey.belongsTo(models.producer, { foreignKey: 'producer_id' });
  };

  return Survey;
};
