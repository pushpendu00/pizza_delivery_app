
const cartModel = require('../models/cartModel');
const userModel = require('../models/userModel');
const { verify_jwt_token } = require('../utils/jwt');


// Add item to cart

module.exports.addToCart = async (req,res)=>{
    try {
        // console.log(req.body.pizza_id," ",req.id);
        const presentItem = await cartModel.findOne({
            user : req.id,
            pizza : req.body.pizza_id,
        });
        if(presentItem){
            await cartModel.findByIdAndUpdate({_id : presentItem._id},{
                $inc : {
                    quantity : 1,
                }
            });
            return res.send({
                status : 200,
                message : "Successfully",
            });
        }
        const new_item = new cartModel({
            user : req.id,
            pizza : req.body.pizza_id,
        });
        await new_item.save();

        await userModel.findByIdAndUpdate({_id : req.id},{
            $push :{
                cartItem : {$each : [new_item._id],$position : 0}
            }
        });
        return res.send({
            status : 200,
            message : "Successfully",
        })
    } catch (error) {
        console.log(error);
        return res.send({
            status : 502,
            message : "Internal Serverr Error"
        });
    }
}




// Decrement cart items
module.exports.increment_item = async (req,res)=>{
    try {
        const presentItem = await cartModel.findOne({
            user : req.id,
            pizza : req.body.pizza_id,
        });
        await cartModel.findByIdAndUpdate({_id : presentItem._id},{
            $inc : {
                quantity : 1,
            }
        });
        return res.send({
            status : 200,
            message : "Successfully"
        });
    } catch (error) {
        return res.send({
            status : 502,
            message : "Internal Server Down"
        });
    }
}




// Increment cart items
module.exports.decrement_item = async (req,res)=>{
    try {
        const presentItem = await cartModel.findOne({
            user : req.id,
            pizza : req.body.pizza_id,
        });
        await cartModel.findByIdAndUpdate({_id : presentItem._id},{
            $inc : {
                quantity : -1,
            }
        });
        return res.send({
            status : 200,
            message : "Successfully"
        });
    } catch (error) {
        return res.send({
            status : 502,
            message : "Internal Server Down"
        });
    }
}




// Remove item from cart

module.exports.remove_item = async (req,res)=>{
    try {
        // console.log(req.body.itemId);
        await userModel.findByIdAndUpdate({_id : req.id},{
            $pull : {
                cartItem : req.body.itemId,
            }
        });
        await cartModel.findByIdAndDelete({_id : req.body.itemId});
        return res.send({
            status : 200,
            message : "Successfully"
        });
    } catch (error) {
        return res.send({
            status : 502,
            message : "Internal Server Down"
        });
    }
}
