const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
        answer:{
            type:String,
            require:true
        },
        date:{
            type:Date,
            default:Date.now
        },
        view:{
            type:Number,
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
module.exports = answer = mongoose.model('answer',answerSchema)