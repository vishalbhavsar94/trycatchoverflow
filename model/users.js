const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    typeid:{
        type:String,
    }
})

module.exports  = user = mongoose.model('users',userSchema);