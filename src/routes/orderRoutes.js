const router = require('express').Router();

const {
    addNewOrder,
    getAllOrders,
    getOrderById,
    editOrderById,
    updateOrderStatus,
    deleteOrderById
} = require('../controllers/orderControllers')

const {
    validateToken
} = require('../middlewares/middlewares');

router.post('/', [validateToken], addNewOrder);
router.get('/', [validateToken], getAllOrders);
router.get('/:idOrder', [validateToken], getOrderById);
router.put('/:idOrder', [validateToken], editOrderById);
router.patch('/:idOrder', [validateToken], updateOrderStatus);
router.delete('/:idOrder', [validateToken], deleteOrderById);

module.exports = router;