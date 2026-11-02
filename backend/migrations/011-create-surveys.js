'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('surveys', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      producer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'producers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      kobotoolbox_submission_id: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },

      survey_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },

      enumerator: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      data_stream_source: { type: DataTypes.STRING(255), allowNull: true },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('surveys', ['producer_id']);
    await queryInterface.addIndex('surveys', ['kobotoolbox_submission_id']);

  },

  async down(queryInterface) {
    await queryInterface.dropTable('surveys');
  }
};