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
    allOrdersId,
    orderBody,
    orderStatusBody,
    orderId,
    orderStatusIdExists,
    getProductsOrders
} = require('../middlewares/middlewares');

router.post('/', [validateToken, orderBody], addNewOrder);
router.get('/', [validateToken, validateAdmin], getAllOrders);
router.get('/:idOrder', [validateToken, getProductsOrders, allOrdersId, orderId], getOrderById);
router.patch('/:idOrder', [validateToken, validateAdmin, orderId, orderStatusBody, orderStatusIdExists], updateOrderStatus);
router.delete('/:idOrder', [validateToken, validateAdmin, orderId], deleteOrderById);

module.exports = router;