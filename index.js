if(process.env.NODE_ENV!=='production'){
  require('dotenv').config();
}


const express = require('express');
const expressLayouts = require("express-ejs-layouts")
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose")

const Routers = require('./routes/route')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


app.use('/', Routers);

// connecting database


mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser:true})
.then(()=>console.log("connected"))
.catch((err)=>{
    console.log("an error occured while connecting to the mongoDB database "+ err);
});

const db = mongoose.connection;

db.on('error', error=>console.log(error))
db.once('open', ()=>console.log("connected to the Database"));




app.listen(port, function() {
  console.log(`Server is running on  ${port}!`)
});