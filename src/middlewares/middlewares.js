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

const allUsersId = (req, res, next) => {
    const {idUser} = req.params;
    const {id_user, isAdmin} = req.params.user;

    if (isAdmin || idUser == id_user) next();
    else {
        res.status(401).json({
            success: false,
            msg: "Invalid token, no token or not authorized to make this request"
        });
    }
}


const allOrdersId = (req, res, next) => {
    const {idOrder} = req.params;
    const {id_user, isAdmin} = req.params.user;

    db.query('SELECT id_user FROM Orders WHERE id_order = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idOrder]
        })
        .then( result => {
            const idUser = result[0].id_user;
            if(isAdmin || id_user == idUser) next();
            else {
                res.status(401).json({
                    success: false,
                    msg: "Invalid token, no token or not authorized to make this request"
                });
            }
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

const emailOrUsernameExists = (req, res, next) => {
    const { username, email } = req.body;
    
    db.query('SELECT username, email FROM Users WHERE username = ? OR email = ?',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: [username, email]
    })
    .then( users =>{
        if(users.find(user => user.email == email).length) {
            res.status(409).json({success: false, error: "Email is already used"});
        }

        else if(users.find(user => user.username == username).length) {
            res.status(409).json({success: false, error: "Username is already used"});
        }

        else next();
    });

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

const userFavExists = (req, res, next) => {
    const { id_product } = req.body;
    const {idUser} = req.params;
    
    db.query('SELECT id_product FROM Products_Favorites WHERE id_user = ?',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: [idUser]
    })
    

}

const productBody = (req, res , next) => {

    const {name, price, description, url_image, code} = req.body;

    if (name && price && description && url_image && code) next();
    else {
        res.status(422).json({
            success: false,
            msg: "The body request have semantic errors",
            schemaExample: {
                name: "Fried Chicken Wings",
                price: 600,
                description: "5 delicious fried chicken wings",
                url_image: "url",
                code: "FriChi"
            }
        })
    }
}

const orderBody = (req, res, next) => {

    const { id_user, id_payment, address, products } = req.body;

    if (id_user && id_payment && address && products) next();
    else {
        res.status(422).json({
            success: false,
            msg: "The body request have semantic errors",
            schemaExample: {
                products: 
                [
                    {
                        id_product: 3,
                        quantity: 2
                    },
                    {
                        id_product: 8,
                        quantity: 1
                    }
                ],
                id_user: 2,
                id_payment: 1,
                address: "Croacia 2919"
            }
        })
    }

}

module.exports = {
    validateToken,
    validateAdmin,
    allUsersId,
    allOrdersId,
    loginBody,
    userBody,
    userFavBody,
    productBody,
    orderBody,
    emailOrUsernameExists,
    getProductsOrders
}