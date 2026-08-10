const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

module.exports = sequelize.define("raw_material", {
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