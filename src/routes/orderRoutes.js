const router = require('express').Router();

const {
    addNewOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrderById
} = require('../controllers/orderControllers')

const {
    validateToken,
    validateAdmin,
    AllOrdersId,
    getProductsOrders
} = require('../middlewares/middlewares');

router.post('/', [validateToken, validateAdmin], addNewOrder);
router.get('/', [validateToken, validateAdmin], getAllOrders);
router.get('/:idOrder', [validateToken, getProductsOrders, AllOrdersId], getOrderById);
router.patch('/:idOrder', [validateToken, validateAdmin], updateOrderStatus);
router.delete('/:idOrder', [validateToken, validateAdmin], deleteOrderById);

module.exports = router;