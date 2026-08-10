const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

module.exports = sequelize.define("nutrient_profile", {
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
    protein: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    iron: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    zinc: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    vitamin_a: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    calcium: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    energy: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    laboratory_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    verification_date: {
        type: Sequelize.DATEONLY,
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