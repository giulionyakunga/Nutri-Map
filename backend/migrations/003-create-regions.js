'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('regions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },

      country: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 'Tanzania'
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

    await queryInterface.addIndex(
      'regions',
      ['name', 'country'],
      {
        unique: true,
        name: 'regions_name_country_unique'
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('regions');
  }
};