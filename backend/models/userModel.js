const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
    },
    address :  {
        type : String,
    },
    phone : {
        type : Number,
    },
    password : {
        type : String,
    },
    cartItem : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'cart',
        }
    ],
    cheese : {
        type : Number,
        default : 0,
    },
    order : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'order',
        }
    ],
},{timestamps : true});

const userModel = mongoose.model('user',schema);


module.exports = userModel;