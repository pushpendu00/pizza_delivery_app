

const cartModel = require('../models/cartModel');
const userModel = require('../models/userModel');
const { verify_jwt_token } = require('../utils/jwt');



//** user details */
module.exports.user = async(req,res)=>{
    try{
        const {token} = req.body;
        // console.log("token - ",token);
        let U = await verify_jwt_token(token);
        const user = await userModel.findById({_id : U.userId})
        .populate('order')
        .populate({
            path : 'cartItem',
            populate : {
                path : 'pizza',
            }
        });

        if(!user){
            return res.send({
                message : "User not found",
                status : 404
            });
        }
        return res.send({
            user,
            status : 200,
        })
    }catch(err){
        console.log(err);
        return res.send({
            message : "Technical Error",
            status : 502
        });
    }
}



