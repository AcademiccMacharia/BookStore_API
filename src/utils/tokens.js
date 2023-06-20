const jwt = require('jsonwebtoken')
require('dotenv').config()

const tokenGenerator = async (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '600s'});
}

function tokenVerifier(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}


module.exports = {
    tokenGenerator,
    tokenVerifier
}