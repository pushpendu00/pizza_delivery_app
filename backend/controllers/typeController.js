const pizzaModel = require("../models/pizzaModel");

module.exports.allpizza = async (req,res)=>{
    try {
        // console.log("hello");
        const all_pizza = await pizzaModel.find();
        // console.log(all_pizza);
        res.send({
            status : 200,
            message : "Sucessfully",
            all_pizza,
        });
    } catch (error) {
        // console.log(error);
        return res.send({
            status : 502,
            message : "Internal Error"
        });
    }
}


module.exports.pizza_type = async (req,res)=>{
    try {
        // console.log(req.body.item_type);
        const all_pizza = await pizzaModel.find({
            category : req.body.item_type
            // itemName : "Malai Paneer Pizza"
        });

        // console.log(all_pizza);
        res.send({
            status : 200,
            message : "Sucessfully",
            all_pizza,
        });
    } catch (error) {
        console.log(error);
        return res.send({
            status : 502,
            message : "Internal Error"
        });
    }
}