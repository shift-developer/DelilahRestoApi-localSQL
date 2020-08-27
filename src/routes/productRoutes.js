const router = require('express').Router();

const {
    addNewProduct,
    getAllProducts,
    getProductById,
    editProductById,
    deleteProductById
} = require('../controllers/productControllers');

const {
    validateToken
} = require('../middlewares/middlewares');

router.post('/', [validateToken], addNewProduct);
router.get('/', [validateToken], getAllProducts);
router.get('/:idProduct', [validateToken], getProductById);
router.put('/:idProduct', [validateToken], editProductById);
router.delete('/:idProduct', [validateToken], deleteProductById);

module.exports = router;