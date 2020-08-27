const { isValidToken } = require('./jwt');
const { db, Sequelize } = require('../../db/database');

const validateToken = (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth) {
        const token = auth.split(' ')[1];
        const user = isValidToken(token);

        if(user) {
            req.params.user = user;
            next();
        } else {
            res.status(401).json({
                success: false,
                msg: "Invalid token, no token or not authorized to make this request"
            });
        }
    } else {
        res.status(401).json({
            success: false,
            msg: "Invalid token, no token or not authorized to make this request"
        });
    }
}

module.exports = {
    validateToken
}