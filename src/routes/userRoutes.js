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
    AllUsersId
} = require('../middlewares/middlewares');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', [validateToken, validateAdmin], getAllUsers);
router.get('/:idUser', [validateToken, AllUsersId], getUserById);
router.put('/:idUser', [validateToken, AllUsersId], editUserById);
router.delete('/:idUser', [validateToken, validateAdmin], deleteUserById);
router.post('/:idUser/favs', [validateToken, AllUsersId], addFavProduct);
router.get('/:idUser/favs', [validateToken, AllUsersId], getFavProduct);
router.delete('/:idUser/favs/:idProduct', [validateToken, AllUsersId], deleteFavProduct);

module.exports = router;