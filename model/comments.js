const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
        comment:{
            type:String,
            require:true
        },
        questionid:{
            type:String,
            require:true
        },
        userid:{
            type:String,
            require:true
        }
        
})
module.exports = comments = mongoose.model('comments',commentSchema)