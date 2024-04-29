

const bcrypt = require('bcrypt');

const create_hash_password = async(password)=>{
    return await bcrypt.hash(password,5);
}

const verify_hash_password = async(plain_password, hs_password)=>{
    return await bcrypt.compare(plain_password,hs_password);
}


module.exports = {create_hash_password, verify_hash_password};