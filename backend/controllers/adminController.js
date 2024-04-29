
const orderModel = require('../models/orderModel');

module.exports.past_order = async (req,res)=>{
    try {
        const past_order = await orderModel.find({delivery : true}).populate('user').sort({createdAt : -1});
        // console.log(past_order);
        return res.send({
            status : 200,
            past_order,
            message : 'Successfully'
        })
    } catch (error) {
        return res.send({
            status : 502,
            message : 'Server Error'
        })
    }
}



module.exports.current_order = async (req,res)=>{
    try {
        const current_order = await orderModel.find({delivery : false}).populate('user').sort({createdAt : -1});
        // console.log(current_order);
        return res.send({
            status : 200,
            current_order,
            message : 'Successfully'
        })
    } catch (error) {
        return res.send({
            status : 502,
            message : 'Server Error'
        })
    }
}


// Update Order Status

module.exports.update_status = async (req,res)=>{
    try {
        if(req.body.updateValue === 100){
            await orderModel.findByIdAndUpdate({_id : req.body.order_id},{
                orderStatus : req.body.updateValue,
                delivery : true,
            })
            return res.send({
                status : 200,
                message : 'Successfully'
            })
        }
        await orderModel.findByIdAndUpdate({_id : req.body.order_id},{
            orderStatus : req.body.updateValue,
        });

        return res.send({
            status : 200,
            message : 'Successfully'
        })
    } catch (error) {
        console.log(error);
        return res.send({
            status : 502,
            message : 'Server Error'
        })
    }
}


