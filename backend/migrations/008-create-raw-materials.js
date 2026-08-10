'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('raw_materials', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      material_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      source_location: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      seasonality: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },

      availability: {
        type: Sequelize.STRING(100),
        allowNull: true
      }

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

    await queryInterface.addIndex('raw_materials', ['product_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('raw_materials');
  }
};