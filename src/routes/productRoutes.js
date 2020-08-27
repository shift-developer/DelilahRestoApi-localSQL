const router = require('express').Router();

const {
    addNewProduct,
    getAllProducts,
    getProductById,
    editProductById,
    deleteProductById
} = require('../controllers/productControllers');

router.post('/', addNewProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', editProductById);
router.delete('/:id', deleteProductById);

module.exports = router;