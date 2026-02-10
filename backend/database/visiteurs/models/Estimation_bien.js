const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Estimation_bien', {
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
        Adresse_bien: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Superficie: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Nombre_de_pieces: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Etat_du_bien: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'Estimation_bien_info',
        timestamps: false
    });
};
