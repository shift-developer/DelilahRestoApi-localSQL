const Sequelize = require('sequelize');
const { dbOptions } = require('./config/config');

const db = new Sequelize(dbOptions);

module.exports = { 
    db,
    Sequelize
}