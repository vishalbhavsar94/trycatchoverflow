const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const db = require('./config/database').mongodb;
//init app
const app  = new express();
// cors 
app.use(cors());

//connecting mongo db
mongoose.Promise = global.Promise;
//connect to mogoose

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

//passport initializing
app.use(passport.initialize());

//middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));

//parse application json
app.use(bodyParser.json());

//routes
const api = require('./routes/api');
app.use('/api',api);

app.get('/',function(req,res){
    res.send('working properly');
})
//server 
const port = 5000;
app.listen(port,function(){
    console.log('Server Started on Port:'+port);
})
