const Razorpay = require('razorpay');
const { findById } = require('../models/pizzaModel');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const cartModel = require('../models/cartModel');

module.exports.create_ordet_id = async (req,res)=>{
    try {
        // console.log("hello world");
        const instance = new Razorpay({
            key_id : process.env.key_id,
            key_secret : process.env.key_secret,
        });
        const options = {
            amount : req.body.amount*100,
            currency : 'INR'
        }
        const order = await instance.orders.create(options);
        return res.send({
            status : 200,
            order,
        });
    } catch (error) {
        console.log(error)
        return res.send({
            status : 502,
            message : "Server Error",
        });
    }
}

module.exports.create_order = async (req,res)=>{
    try {
        // console.log(req.body.cartItem);
        const New_order = new orderModel({
            user : req.id,
            address : req.body.address,
            amount : req.body.amount,
            order_Id : req.body.order_Id,
            payment_Id : req.body.payment_Id,
            order : req.body.cartItem,
            cheese : req.body.cheese,
        });
        const order = await New_order.save();
        await userModel.findByIdAndUpdate({_id : req.id},{
            $push :{
                order : {$each : [order._id],$position : 0},
            }
        });
        // await orderModel.findByIdAndUpdate({_id : order._id},{
        //     $push :{
        //         orderStatus : {$each : ["Order Confirmed"],$position : 0},
        //     }
        // });
        await cartModel.deleteMany({user : req.id});
        const new_array = [];
        await userModel.findByIdAndUpdate({_id : req.id},{
            cartItem : new_array,
        });

        return res.send({
            status : 200,
            order,
            message : "Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.send({
            status : 502,
            message : "Error"
        });
    }
}