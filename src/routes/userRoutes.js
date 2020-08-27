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

//import of middlewares

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', editUserById);
router.delete('/:id', deleteUserById);
router.post('/:id/favs', addFavProduct);
router.get('/:id/favs', getFavProduct);
router.delete('/:id/favs/:idProduct', deleteFavProduct);

module.exports = router;