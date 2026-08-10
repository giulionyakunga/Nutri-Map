'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
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

      product_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      category: {
        type: Sequelize.STRING(150),
        allowNull: true
      },

      processing_method: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      shelf_life: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      packaging_type: {
        type: Sequelize.STRING(150),
        allowNull: true
      },

      price_per_unit: {
        type: Sequelize.DOUBLE,
        allowNull: true
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

    await queryInterface.addIndex('products', ['producer_id']);
    await queryInterface.addIndex('products', ['category']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  }
};