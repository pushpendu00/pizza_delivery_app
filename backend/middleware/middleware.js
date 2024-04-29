
const {verify_jwt_token} = require('../utils/jwt');
const userModel = require('../models/userModel');

const middleware = async (req,res,next)=>{
    try{
        const token = req.body.token;
        // console.log(token)
        if(!token){
            return res.send({
                status : 401,
                message : "Please Login First!"
            });
            // return res.redirect('/login');
        }
        let user = await verify_jwt_token(token);
        let authUser = await userModel.findById({_id : user.userId});
        if(!authUser){
            return res.send({
                status : 404,
                message : "User not found"
            })
            // return res.redirect('/register');
        }
        req.id = authUser._id;
        // console.log("user page access");
        next();
    }catch(err){
        console.log(err);
        return res.send({
            status : 502,
            message : "Authentication Error",
        })
    }
}
module.exports = middleware;