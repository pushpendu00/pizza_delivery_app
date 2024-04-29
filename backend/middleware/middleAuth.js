const { verify_jwt_token } = require('../utils/jwt');

const middleAuth=async (req,res,next)=>{
    try {
        const {token}= req.body.token;
        // console.log("hello",token);
        let U = await verify_jwt_token(token);
        // console.log(U);
        req.id = U.userId;
        next();
    } catch (error) {
        console.log(error)
        res.send({
            status : 502,
            message : "Cookies Error"
        })
    }
}


module.exports = middleAuth;