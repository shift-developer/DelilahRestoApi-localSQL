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
    const {idOrder} = req.params;
    const {id_user, isAdmin} = req.params.user;

    db.query('SELECT id_user FROM Orders WHERE id_order = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idOrder]
        })
        .then( result => {
            const {id_user} = result[0];
        })
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

const loginBody = (req, res, next) => {
    const { username, password} = req.body;

    if (username && password) next();
    else {
        res.status(422).json({
            success: false,
            msg: "The body request have semantic errors",
            schemaExample: {
                username: "JhonWickOk",
                password: "password123",
            }
        })
    }
}

const userBody = (req, res, next) => {
    const { username, full_name, email, telephone, address, password} = req.body;

    if (username && full_name && email && telephone && address && password) next();
    else {
        res.status(422).json({
            success: false,
            msg: "The body request have semantic errors",
            schemaExample: {
                username: "JhonWickOk",
                password: "password123",
                full_name: "Jhon Wick",
                email: "jhonw@gmail.com",
                telephone: "123456789",
                address: "Saint lup 25"
            }
        })
    }
}

const userFavBody = (req, res, next) => {
    const { id_product } = req.body;

    if (id_product) next();
    else {
        res.status(422).json({
            success: false,
            msg: "The body request have semantic errors",
            schemaExample: {
                id_product: 1
            }
        })
    }
}





module.exports = {
    validateToken,
    validateAdmin,
    AllUsersId,
    AllOrdersId,
    getProductsOrders
}