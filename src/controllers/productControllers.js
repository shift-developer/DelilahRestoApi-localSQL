const {db, Sequelize } = require('../../db/database');

const addNewProduct = (req, res) => {

    const product = req.body;
    const {name, price, description, url_image, code} = req.body;

    db.query('INSERT INTO Products (name, price, url_image, code, description) VALUES (?, ? ,? ,?, ?)',
        {
            type: Sequelize.QueryTypes.INSERT,
            replacements: [name, price, url_image, code, description]
        })
        .then(result => {
            res.status(201).json({
                success: true,
                msg: "Product created",
                product: product
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        });

}

const getAllProducts = (req, res) => {

    db.query('SELECT * FROM Products',
        {
            type: Sequelize.QueryTypes.SELECT
        })
        .then( products => {
            res.json(products);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        });


}

const getProductById = (req, res) => {

    const {idProduct} = req.params;

    db.query('SELECT * FROM Products WHERE id_product = ?',
    {
        type: Sequelize.QueryTypes.SELECT,
        replacements: [idProduct]
    })
    .then( result => {
        if (result.length !== 0) {
            res.json(result)
        } else {
            res.status(404).json({success: false, msg: "Id not found"});
        }
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Server internal error'})
    });

}

const editProductById = (req, res) => {

    const { idProduct } = req.params;
    const product = req.body;
    const { name, price, description, url_image, code } = req.body;

    db.query('UPDATE Products SET name = ?, price = ?, url_image = ?, code = ?, description = ? WHERE id_product = ?',
        {
            type: Sequelize.QueryTypes.UPDATE,
            replacements: [name, price, url_image, code, description, idProduct]
        })
        .then(result => {
            res.json({success: true, msg: "Product successfully updated", editedProduct: product});
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'});
        });

}

const deleteProductById = (req, res) => {

    const { idProduct } = req.params;
    const deletedProduct = req.params.product;

    db.query('DELETE FROM Products WHERE id_product = ?',
    {
        type: Sequelize.QueryTypes.DELETE,
        replacements: [idProduct]
    })
    .then(result => {
        res.json({
            success: true,
            message: "Product deleted",
            deletedProduct: deletedProduct
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Server internal error'});
    });


}

module.exports = {
    addNewProduct,
    getAllProducts,
    getProductById,
    editProductById,
    deleteProductById
}