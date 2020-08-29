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

const validateAdmin = (req, res, next) => {
    const {isAdmin} = req.params.user;

    if(isAdmin) {
        next();
    } else {
        res.status(401).json({
            success: false,
            msg: "Invalid token, no token or not authorized to make this request"
        });
    }
}

const AllUsersId = (req, res, next) => {
    const {idUser} = req.params;
    const {id_user, isAdmin} = req.params.user;

    if (isAdmin || idUser == id_user) {
        next();
    } else {
        res.status(401).json({
            success: false,
            msg: "Invalid token, no token or not authorized to make this request"
        });
    }
}

const AllOrdersId = (req, res, next) => {

}

const getProductsOrders = (req, res, next) => {

    const {idOrder} = req.params;

    db.query('SELECT id_product, quantity FROM Products_Orders WHERE id_order = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idOrder]
        })
        .then( productOrders =>{
            req.params.productOrders = productOrders;
            next();
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        });

}

module.exports = {
    validateToken,
    validateAdmin,
    AllUsersId,
    AllOrdersId,
    getProductsOrders
}