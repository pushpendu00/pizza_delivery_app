const jwt = require('jsonwebtoken');

const create_jwt_token = async (user)=>{
    // create jwt token
    const token = jwt.sign({
        userId : user._id,
        // firstName : user.firstName,
        },process.env.jwt_secret,
        {
            expiresIn : '60d'
        }
    );
    return token;
}

const verify_jwt_token = async (token)=>{
    return await jwt.verify(token, process.env.jwt_secret);
}


module.exports = {create_jwt_token, verify_jwt_token}