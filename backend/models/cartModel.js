const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user',
    },
    pizza : {
        type : mongoose.Types.ObjectId,
        ref : 'pizza',
    },
    quantity : {
        type : Number,
        default : 1,
    }
},{timestamps : true});

const cartModel = mongoose.model('cart',schema);


module.exports = cartModel;