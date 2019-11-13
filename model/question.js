const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    question:{
        type:String,
        require:true
    },
    questionDesc:{
        type:String,
    },
    view:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports = Question = mongoose.model('question',QuestionSchema);