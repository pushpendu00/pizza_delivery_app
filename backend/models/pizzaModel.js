const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    itemName : {
        type : String,
    },
    image : {
        type : String,
    },
    description : {
        type : String,
    },
    category : [
        {
            type : String,
        }
    ],
    price : {
        type : String,
    },
    rating : {
        type : String,
    },
    votes : {
        type : Number,
    }
},{timestamps : true});


const pizzaModel = mongoose.model('pizza', schema);


module.exports = pizzaModel;