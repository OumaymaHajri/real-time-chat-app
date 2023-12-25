const jwt = require('jsonwebtoken');


const generateToken = (_id) => {

    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey);

}

module.exports = generateToken;