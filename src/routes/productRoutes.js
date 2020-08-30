const router = require('express').Router();

const {
    addNewProduct,
    getAllProducts,
    getProductById,
    editProductById,
    deleteProductById
} = require('../controllers/productControllers');

const {
    validateToken,
    validateAdmin,
    productBody,
    nameOrCodeExists,
    productId
} = require('../middlewares/middlewares');

router.post('/', [validateToken, validateAdmin, productBody, nameOrCodeExists], addNewProduct);
router.get('/', [validateToken], getAllProducts);
router.get('/:idProduct', [validateToken, productId], getProductById);
router.put('/:idProduct', [validateToken, validateAdmin, productBody, productId], editProductById);
router.delete('/:idProduct', [validateToken, validateAdmin, productId], deleteProductById);

module.exports = router;