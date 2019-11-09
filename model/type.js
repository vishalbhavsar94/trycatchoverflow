const mongoose = require('mongoose')

const TypeSchema = mongoose.Schema({
    type:{
        type:String,
        require:true
    }
})

module.exports = type = mongoose.model('usertype',TypeSchema);