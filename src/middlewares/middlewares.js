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
            if(result.length != 0) {
                const idUser = result[0].id_user;
                if(isAdmin || id_user == idUser) next();
                else {
                    res.status(401).json({
                        success: false,
                        msg: "Invalid token, no token or not authorized to make this request"
                    });
                }
            } else {
                res.status(404).json({success: false, error: "Id not found"});
            }
            
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'});
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

        if(users.length != 0) {
            if(users.find(user => user.email == email)) {
                res.status(409).json({success: false, error: "Email is already used"});
            }
            else if(users.find(user => user.username == username)) {
                res.status(409).json({success: false, error: "Username is already used"});
            }
        }

        else next();
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Server internal error'})
    });

}

const userId = (req, res, next) => {
    const {idUser} = req.params;

    db.query('SELECT id_user FROM Users WHERE id_user = ?',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: [idUser]
    })
    .then( user =>{
        if( user.length != 0) {
            const {id_user} = user[0];
            if (id_user) next();
            else{
                res.status(404).json({success: false, error: "Id not found"});
            }
        } else {
            res.status(404).json({success: false, error: "Id not found"});
        }
        
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Server internal error'})
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
    .then( favs => {
        if (favs.find((fav) => fav.id_product == id_product)) {
            res.status(409).json({success: false, error: "Favorite product is already added"})
        } else next();
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Server internal error'})
    });

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

const nameOrCodeExists = (req, res, next) => {
    const {name, code} = req.body;
    
    db.query('SELECT name, code FROM Products WHERE name = ? OR code = ?',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: [name, code]
    })
    .then( products =>{

        if(products.length != 0) {
            if(products.find(product => product.name == name)) {
                res.status(409).json({success: false, error: "Name is already used"});
            }
    
            else if(products.find(product => product.code == code)) {
                res.status(409).json({success: false, error: "Code is already used"});
            }
    
        }
        
        else next();
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Server internal error'})
    });

}

const productId = (req, res, next) => {
    const {idProduct} = req.params;

    db.query('SELECT * FROM Products WHERE id_product = ?',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: [idProduct]
    })
    .then( product =>{
        if (product.length !== 0) {
            req.params.product = product;
            next();
        }
        else{
            res.status(404).json({success: false, error: "Id not found"});
        }
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Server internal error'})
    });
}

const orderId = (req, res, next) => {
    const {idOrder} = req.params;

    db.query('SELECT * FROM Orders WHERE id_order = ?',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: [idOrder]
    })
    .then( order =>{
        if (order.length !== 0) {
            req.params.order = order;
            next();
        }
        else{
            res.status(404).json({success: false, error: "Id not found"});
        }
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Server internal error'})
    });
}

const orderBody = (req, res, next) => {

    const { id_payment, address, products } = req.body;
    

    if ( id_payment && address && products) next();
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

const orderStatusBody = (req, res, next) => {

    const { id_status } = req.body;

    if ( id_status ) next();
    else {
        res.status(422).json({
            success: false,
            msg: "The body request have semantic errors",
            schemaExample: {
                id_status: 2
            }
        })
    }

}

const orderStatusIdExists = (req, res, next) => {

    const { id_status } = req.body;

    db.query('SELECT id_status FROM statuscode WHERE id_status = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [id_status]
        })
        .then( result => {
            const {id_status} = result[0];

            if(id_status) next();
            else {
                res.status(422).json({success: false, error: "id_status not valid"})
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

const getOrders = (req, res, next) => {
    const {idUser} = req.params;

    db.query('SELECT id_order FROM Orders WHERE id_user = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idUser]
        })
        .then( orders =>{
            req.params.orders = orders;
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
    allUsersId,
    allOrdersId,
    loginBody,
    userBody,
    userFavBody,
    productBody,
    orderBody,
    orderStatusBody,
    emailOrUsernameExists,
    userFavExists,
    nameOrCodeExists,
    userId,
    productId,
    orderId,
    orderStatusIdExists,
    getProductsOrders,
    getOrders
}