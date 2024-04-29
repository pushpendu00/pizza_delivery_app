const express = require('express');
require('dotenv').config();
require('./config/mongodb').connectFun();
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));
const port = process.env.port || 4400;

app.use(cors({
    origin : [process.env.origin,process.env.originAdmin],
    methods : ['GET','POST','PUT','DELETE']
}));


app.use('/', require('./router/index'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Server is note create`);
        return;
    }else{
        console.log(`Server is Running on Port ${port}............`);
    }
})