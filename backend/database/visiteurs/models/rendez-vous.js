const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Rendez_vous', {
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
        Motif: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        heure: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'rendez-vous_info',
        timestamps: false
    });
};
