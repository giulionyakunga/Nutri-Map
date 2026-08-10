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

      json_data: {
        type: Sequelize.JSONB,
        allowNull: true
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('surveys', ['producer_id']);
    await queryInterface.addIndex('surveys', ['kobotoolbox_submission_id']);

    // Useful for searching inside Kobo submissions
    await queryInterface.sequelize.query(`
      CREATE INDEX surveys_json_data_gin_idx
      ON surveys
      USING GIN (json_data);
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('surveys');
  }
};