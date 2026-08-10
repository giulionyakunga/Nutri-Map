'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      middle_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },

      phone_number: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: true
      },

      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      status: {
        type: Sequelize.STRING(30),
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

    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['role_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};