const {db, Sequelize } = require('../../db/database');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/jwt');

const registerUser = (req, res) => {

    const { userName, fullName, email, phoneNumber, address} = req.body;

    const password = bcrypt.hashSync(req.body.password, 10);

    db.query('INSERT INTO Users (full_name, email, telephone, username, password, address) VALUES (?, ? ,? ,?, ?, ?)',
        {
            type: Sequelize.QueryTypes.INSERT,
            replacements: [fullName, email, phoneNumber, userName, password, address]
        })
        .then( result => {
            res.status(201).json({success: true, msg: 'User successfully created'});
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        });

}

const loginUser = (req, res) => {

    const { userName, password } = req.body;

    db.query('SELECT * FROM Users WHERE username = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [userName]
        })
        .then( result => {
            const user = result[0];
            if(result.length !== 0) {
                 const isPasswordCorrect = bcrypt.compareSync(password, user.password)
                 let { id_user, admin } = user;
                 admin === 0 ? admin = false : admin = true;

                if(isPasswordCorrect) {
                    const token = generateToken({id_user: id_user, isAdmin: admin});
                    res.json({
                        success: true,
                        userName: userName,
                        accessToken: token
                    });
                } else {
                    res.status(401).json({success: false, error: "incorrect user-password"});
                }

            } else {
                res.status(401).json({success: false, error: "incorrect user-password"});
            }
        })
        .catch( error => {
            console.log(error);
            res.status(500).json({error: "Internal error"})
        });
}

const getAllUsers = (req, res) => {

    db.query('SELECT * FROM Users',
        {
            type: Sequelize.QueryTypes.SELECT
        })
        .then( users => {
            res.json(users);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        })
}

const getUserById = (req, res) => {



}

const editUserById = (req, res) => {



}

const deleteUserById = (req, res) => {



}

const addFavProduct = (req, res) => {



}

const getFavProduct = (req, res) => {

    

}

const deleteFavProduct = (req, res) => {

    

}


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    editUserById,
    deleteUserById,
    addFavProduct,
    getFavProduct,
    deleteFavProduct
}