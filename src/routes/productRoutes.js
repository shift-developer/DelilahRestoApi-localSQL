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
    productBody
} = require('../middlewares/middlewares');

router.post('/', [validateToken, validateAdmin, productBody], addNewProduct);
router.get('/', [validateToken], getAllProducts);
router.get('/:idProduct', [validateToken], getProductById);
router.put('/:idProduct', [validateToken, validateAdmin, productBody], editProductById);
router.delete('/:idProduct', [validateToken, validateAdmin], deleteProductById);

module.exports = router;