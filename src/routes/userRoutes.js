const router = require('express').Router();

const { 
    getAllUsers,
    registerUser,
    loginUser
} = require('../controllers/userControllers');

//import of middlewares

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/', getAllUsers);

module.exports = router;