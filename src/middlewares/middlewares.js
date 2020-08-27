const { isValidToken } = require('./jwt');
const { db, Sequelize } = require('../../db/database');

const validateToken = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || req.params.user) {
        
    }
}