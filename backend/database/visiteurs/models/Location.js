const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Location', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        num: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Budget_max: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Localisation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Durée: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Date_emmenagement: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'Location_info',
        timestamps: false
    });
};
