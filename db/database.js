const Sequelize = require('sequelize');
const { dbOptions} = require('./config/config');

const db = new Sequelize(dbOptions);


    db.authenticate()
        .then( () => console.log('Connection has been established successfully.'))
        .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = { 
    db,
    Sequelize
}