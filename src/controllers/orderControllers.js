const {db, Sequelize } = require('../../db/database');
const moment = require('moment');

const addNewOrder = (req, res) => {

    const { id_user, id_payment, address, products } = req.body;
    
    const DATE = moment(new Date());
    const dateSQL = DATE.format('YYYY-MM-DD HH:mm:ss');

    db.query('INSERT INTO Orders (id_user, total_price, id_payment, date, description, address, id_status) VALUES (?, ? ,?, ?, ?, ?, ?)',
    {
        type: Sequelize.QueryTypes.INSERT,
        replacements: [id_user, 1000, id_payment, dateSQL, "description", address, 1]
    })
    .then( result => {
        
        let id_order = result[0];
        let description = ``;
        let total_price = 0;
        const arrIdProducts = [];

        products.forEach(product => {
            const { id_product, quantity } = product;

            arrIdProducts.push(id_product);

            db.query(`INSERT INTO Products_Orders (id_order, id_product, quantity) VALUES (?, ?, ?)`,
            {
                type: Sequelize.QueryTypes.INSERT,
                replacements: [id_order, id_product, quantity]
            })
            .catch( error => {
                console.log(error);
                res.status(500).json({error: "Internal error"})
            });
        })

        //verify product price on sql db for total_price calculation and construction of description order code
        let querySelectProduct = 'SELECT id_product, price, code FROM Products WHERE' + ' id_product = ? OR'.repeat(products.length).slice(0, -2);

        db.query( querySelectProduct,
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: arrIdProducts
        })
        .then(result => {
            result.forEach( productInfo => {
                const {id_product, price, code} = productInfo;
                
                const {quantity} = products.find( product => product.id_product == id_product);

                description += `${quantity}x${code} `;
                total_price = total_price + Number(price) * quantity;
            });

            db.query('UPDATE Orders SET total_price = ?, description = ? WHERE id_order = ?',
            {
                type: Sequelize.QueryTypes.UPDATE,
                replacements: [total_price, description, id_order]
            })
            .then( result => {

                res.status(201).json({
                    success: true,
                    msg: "Order created",
                    order: {
                        id_order: id_order,
                        id_user: id_user,
                        id_payment: id_payment,
                        status: "new",
                        date: dateSQL,
                        description: description,
                        address: address,
                        products: products,
                        total_price: total_price
                    }
                })
            })
            .catch( error => {
                console.log(error);
                res.status(500).json({error: "Internal error"})
            });

        })
        .catch( error => {
            console.log(error);
            res.status(500).json({error: "Internal error"})
        });

    })
    .catch( error => {
        console.log(error);
        res.status(500).json({error: "Internal error"})
    })

}

const getAllOrders = (req, res) => {

    db.query('SELECT * FROM Orders',
        {
            type: Sequelize.QueryTypes.SELECT
        })
        .then( orders => {
            res.json(orders);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        })

}

const getOrderById = (req, res) => {

    const {idOrder, productOrders} = req.params;
    const {id_user, isAdmin} = req.params.user;

    db.query('SELECT * FROM Orders WHERE id_order = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idOrder]
        })
        .then( result => {
            const idUser = result[0].id_user;

            if (isAdmin || idUser == id_user) {
                if (result.length !== 0) {
                    result[0].products = productOrders;
                    res.json(result);
                } else {
                    res.status(404).json({success: false, msg: "Id not found"});
                }
            }
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        });

}

const updateOrderStatus = (req, res) => {

    const {idOrder} = req.params;
    const { id_status } = req.body;

    db.query('UPDATE Orders SET id_status = ? WHERE id_order = ?',
        {
            type: Sequelize.QueryTypes.UPDATE,
            replacements: [id_status, idOrder]
        })
        .then( result => {
            res.json({success: true, msg: "Order status updated"});
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        });

}

const deleteOrderById = (req, res) => {

    const {idOrder} = req.params;

    db.query('SELECT * FROM Orders WHERE id_order = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idOrder]
        })
        .then( result => {
            if (result.length === 0) {
                res.status(404).json({success: false, msg: "Id not found"});
            } else return result;
        })
        .then( result => {
            let order = result[0];

            db.query('DELETE FROM Orders WHERE id_order = ?',
                {
                    type: Sequelize.QueryTypes.DELETE,
                    replacements: [idOrder]
                })
                .then(result => {
                    res.json({
                        success: true,
                        msg: "Order deleted",
                        deletedOrder: order
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({success: false, msg: 'Server internal error'});
                });
            
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'});
        })

}

module.exports = {
    addNewOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrderById
}