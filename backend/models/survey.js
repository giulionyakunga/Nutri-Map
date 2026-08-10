const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

module.exports = sequelize.define("survey", {
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