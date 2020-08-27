const jwt = require('jsonwebtoken');
const signature = 'H3sOYaM';

const generateToken = (info) => {
    const token = jwt.sign(info, signature);
    return token;
}

const isValidToken = (token) => {
    try {
        const isValid = jwt.verify(token, signature);
        return isValid;
    } catch(e) {
        return false;
    }
}

module.exports = {
    generateToken,
    isValidToken
}