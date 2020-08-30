const router = require('express').Router();

const { 
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    editUserById,
    deleteUserById,
    addFavProduct,
    getFavProduct,
    deleteFavProduct
} = require('../controllers/userControllers');

const {
    validateToken,
    validateAdmin,
    allUsersId,
    loginBody,
    userBody,
    userFavBody,
    emailOrUsernameExists,
    userFavExists,
    userId,
    getOrders
} = require('../middlewares/middlewares');

router.post('/register', [userBody, emailOrUsernameExists], registerUser);
router.post('/login', [loginBody], loginUser);
router.get('/', [validateToken, validateAdmin], getAllUsers);
router.get('/:idUser', [validateToken, allUsersId, userId, getOrders], getUserById);
router.put('/:idUser', [validateToken, allUsersId, userBody, userId], editUserById);
router.delete('/:idUser', [validateToken, validateAdmin, userId], deleteUserById);
router.post('/:idUser/favs', [validateToken, userFavBody, allUsersId, userFavExists, userId], addFavProduct);
router.get('/:idUser/favs', [validateToken, allUsersId, userId], getFavProduct);
router.delete('/:idUser/favs/:idProduct', [validateToken, allUsersId, userId], deleteFavProduct);

module.exports = router;