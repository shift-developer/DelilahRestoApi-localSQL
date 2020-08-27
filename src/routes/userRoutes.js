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
    validateToken
} = require('../middlewares/middlewares');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', [validateToken], getAllUsers);
router.get('/:idUser', [validateToken], getUserById);
router.put('/:idUser', [validateToken], editUserById);
router.delete('/:idUser', [validateToken], deleteUserById);
router.post('/:idUser/favs', [validateToken], addFavProduct);
router.get('/:idUser/favs', [validateToken], getFavProduct);
router.delete('/:idUser/favs/:idProduct', [validateToken], deleteFavProduct);

module.exports = router;