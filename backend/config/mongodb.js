const mongoose = require('mongoose');

module.exports.connectFun = async()=>{
    try{
        await mongoose.connect(process.env.db_link);
        console.log("Database Successfully Connected...........");
    }catch(err){
        // console.log(err);
        console.log("Database not connected");
        return;
    }
}