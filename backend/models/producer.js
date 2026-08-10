const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

module.exports = sequelize.define("producer", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    middle_name: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    registration_type: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    organization_type: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    business_name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    tin: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    contact_person: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(30),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    region_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'regions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    district_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'districts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    ward_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wards',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    physical_address: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    location: {
        type: Sequelize.GEOMETRY('POINT', 4326),
        allowNull: true
    },
    production_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    daily_output: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    number_of_employees: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    verification_status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'pending_field_validation'
    },
    source: {
        type: Sequelize.STRING(100),
        allowNull: false
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