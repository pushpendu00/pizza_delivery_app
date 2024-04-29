const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user',
    },
    amount : {
        type : Number,
    },
    order_Id : {
        type : String,
    },
    payment_Id : {
        type : String,
    },
    order : [],
    cheese : {
        type : Number,
        default : 0,
    },
    address : {
        type : String,
    },
    orderStatus : {
        type : Number,
        default : 10,
    },
    date : {
        type : String,
        default : new Date().toLocaleString(),
    },
    delivery : {
        type : Boolean,
        default : false,
    },
},{timestamps : true});

const orderModel = mongoose.model('order',schema);


module.exports = orderModel;