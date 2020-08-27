const router = require('express').Router();

const {
    addNewOrder,
    getAllOrders,
    getOrderById,
    editOrderById,
    updateOrderStatus,
    deleteOrderById
} = require('../controllers/orderControllers')

router.post('/', addNewOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', editOrderById);
router.patch('/:id', updateOrderStatus);
router.delete('/:id', deleteOrderById);

module.exports = router;