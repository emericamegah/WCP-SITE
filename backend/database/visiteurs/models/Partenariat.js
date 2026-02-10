const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Partenariat', {
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
        Type_de_partenariat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Televersement_de_document: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'Partenariat_info',
        timestamps: false
    });
};
