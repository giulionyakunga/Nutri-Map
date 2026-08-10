'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('certifications', {
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

      certification_type: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      issuing_authority: {
        type: Sequelize.STRING(150),
        allowNull: false
      },

      certificate_number: {
        type: Sequelize.STRING(150),
        allowNull: true
      },

      issue_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },

      expiry_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },

      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'active'
      },

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

    await queryInterface.addIndex('certifications', ['producer_id']);
    await queryInterface.addIndex('certifications', ['certificate_number']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('certifications');
  }
};