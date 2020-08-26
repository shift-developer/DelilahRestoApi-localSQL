const router = require('express').Router();

const { 
    getAllUsers,
    registerUser
} = require('../controllers/userControllers');

//import of middlewares

router.post('/register', registerUser)
router.get('/', getAllUsers);

module.exports = router;