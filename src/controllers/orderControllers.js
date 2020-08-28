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

    

}

const getOrderById = (req, res) => {

    

}

const editOrderById = (req, res) => {

    

}

const updateOrderStatus = (req, res) => {



}

const deleteOrderById = (req, res) => {

    

}

module.exports = {
    addNewOrder,
    getAllOrders,
    getOrderById,
    editOrderById,
    updateOrderStatus,
    deleteOrderById
}