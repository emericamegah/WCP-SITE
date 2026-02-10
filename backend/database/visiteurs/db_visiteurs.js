const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const path = require('path');
require('dotenv').config({path:path.join(__dirname, "../.env")});

let sequelize = null;

async function initDatabase() {
    const {
        DB_HOST,
        DB_NAME1,
        DB_USER,
        DB_PASSWORD,
        DB_PORT,
        DB_DIALECT
    } = process.env;

    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            port: DB_PORT,
            database:DB_NAME1,
            password: DB_PASSWORD
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME1}\`;`);
        await connection.end();

        sequelize = new Sequelize(
            DB_NAME1, 
            DB_USER, 
            DB_PASSWORD, 
            {
                host: DB_HOST,
                dialect: DB_DIALECT,
            }
    );
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
        return sequelize;

    } catch (error) {
        console.error('Unable to connect to the database', error);
        process.exit(1);
    }
}

function getSequelize() {
    return sequelize;
}

module.exports = { initDatabase, getSequelize };
