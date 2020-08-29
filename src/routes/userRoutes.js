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
    emailOrUsernameExists
} = require('../middlewares/middlewares');

router.post('/register', [userBody, emailOrUsernameExists], registerUser);
router.post('/login', [loginBody], loginUser);
router.get('/', [validateToken, validateAdmin], getAllUsers);
router.get('/:idUser', [validateToken, allUsersId], getUserById);
router.put('/:idUser', [validateToken, allUsersId, userBody], editUserById);
router.delete('/:idUser', [validateToken, validateAdmin], deleteUserById);
router.post('/:idUser/favs', [validateToken, userFavBody, allUsersId], addFavProduct);
router.get('/:idUser/favs', [validateToken, allUsersId], getFavProduct);
router.delete('/:idUser/favs/:idProduct', [validateToken, allUsersId], deleteFavProduct);

module.exports = router;