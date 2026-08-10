const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

module.exports = sequelize.define("region", {
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