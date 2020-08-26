const {db, Sequelize } = require('../../db/database');

const registerUser = (req, res) => {

    const { userName, password, fullName, email, phoneNumber, address} = req.body;

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

module.exports = {
    registerUser,
    getAllUsers
}