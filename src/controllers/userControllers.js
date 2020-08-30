const {db, Sequelize } = require('../../db/database');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/jwt');


const registerUser = (req, res) => {

    const { username, full_name, email, telephone, address} = req.body;

    const password = bcrypt.hashSync(req.body.password, 10);

    db.query('INSERT INTO Users (full_name, email, telephone, username, password, address) VALUES (?, ? ,? ,?, ?, ?)',
        {
            type: Sequelize.QueryTypes.INSERT,
            replacements: [full_name, email, telephone, username, password, address]
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

    const { username, password } = req.body;

    db.query('SELECT * FROM Users WHERE username = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [username]
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
                        username: username,
                        id_user: id_user,
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

    const {idUser, orders} = req.params;

    db.query('SELECT * FROM Users WHERE id_user = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idUser]
        })
        .then( result => {
            if (result.length !== 0) {
                result[0].orders = orders;
                res.json(result)
            } else {
                res.status(404).json({success: false, msg: "Id not found"});
            }
        })
}

const editUserById = (req, res) => {

    const {idUser} = req.params;
    const { username, full_name, email, telephone, address } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);

    db.query('UPDATE Users SET full_name = ?, email = ?, telephone = ?, username = ?, password = ?, address = ? WHERE id_user = ?',
        {
            type: Sequelize.QueryTypes.UPDATE,
            replacements: [full_name, email, telephone, username, password, address, idUser]
        })
        .then(result => {
            res.json({success: true, msg: "User successfully updated"});
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: err.errors[0].message});
        });

}

const deleteUserById = (req, res) => {

    const {idUser} = req.params;

    db.query('SELECT * FROM Users WHERE id_user = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idUser]
        })
        .then( result => {
            if (result.length === 0) {
                res.status(404).json({success: false, msg: "Id not found"});
            } else return result;
        })
        .then( result => {
            let user = result[0];

            db.query('DELETE FROM Users WHERE id_user = ?',
                {
                    type: Sequelize.QueryTypes.DELETE,
                    replacements: [idUser]
                })
                .then(result => {
                    res.json({
                        success: true,
                        message: "User deleted",
                        deletedUser: user
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({success: false, msg: 'Server internal error'});
                });
            
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'});
        })
}

const addFavProduct = (req, res) => {

    const {idUser} = req.params;
    const {id_product} = req.body;

    db.query('INSERT INTO Products_Favorites (id_user, id_product) VALUES (?, ?)',
        {
            type: Sequelize.QueryTypes.INSERT,
            replacements: [idUser, id_product]
        })
        .then( result => {
            res.status(200).json({success: true, msg: 'Favourite product added successfully'});
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        });

}

const getFavProduct = (req, res) => {

    const {idUser} = req.params;

    db.query('SELECT id_product FROM Products_Favorites WHERE id_user = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idUser]
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        })

}

const deleteFavProduct = (req, res) => {

    const {idUser, idProduct} = req.params;
    
    db.query('DELETE FROM Products_Favorites WHERE id_user = ? AND id_product = ?',
        {
            type: Sequelize.QueryTypes.DELETE,
            replacements: [idUser, idProduct]
        })
        .then(result => {
            res.json({success: true, msg: "Favourite product deleted"})
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({success: false, msg: 'Server internal error'})
        })

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