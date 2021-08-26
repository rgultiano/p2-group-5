const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    // if there is a JAWSDB_URL parameter then app currently hosted
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
    // otherwise launch off local vars
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: process.env.DB_PORT || 3306
        }
    );
}

module.exports = sequelize;
