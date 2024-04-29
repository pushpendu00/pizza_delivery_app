
// const bcrypt = require('bcrypt');
const {create_hash_password, verify_hash_password} = require('../utils/hash');

const {create_jwt_token, } = require('../utils/jwt');
const userModel = require('../models/userModel');
/*
*
*
*
            Register functionality
*
*
*
*/
module.exports.register = async(req,res)=>{
    try{
        const {name, address, phone, password} = req.body;
        let user = await userModel.findOne({phone : phone});
        // if user already registered
        if(user){
            return res.send({
                status : 201,
                message : "User Already Exist"
            });
        }

        // if user not registered
        // hashing password
        const hash_password = await create_hash_password(password);

        const new_user = new userModel({
            name, phone,address,
            password : hash_password,
        });

        user = await new_user.save();
        const token = await create_jwt_token(user);

        return res.send({
            status : 200,
            user,
            token,
            message : "Successfully Registerd"
        });
    }catch(err){
        console.log(err);
        return res.send({
            status : 502,
            message : "Internal Serverr Error"
        });
    }
}

/*
*
*
*
            Login functionality
*
*
*
*/
module.exports.login = async(req,res)=>{
    try{
        const {phone, password} = req.body;
        let user = await userModel.findOne({phone : phone});
        // if user not registered
        if(!user){
            return res.send({
                status : 403,
                message : "User not registered"
            });
        }

        let isVerify = await verify_hash_password(password, user.password);
        if(!isVerify){
            return res.send({
                status : 401,
                message : "Incorrect Password"
            });
        }
        const token = await create_jwt_token(user);

        return res.send({
            status : 200,
            user,
            token,
            message : "Successfully Login",
        })
    }catch(err){
        // console.log(err);
        return res.send({
            status : 502,
            message : "Login Error"
        });
    }
}