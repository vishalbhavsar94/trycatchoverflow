const mongoose = require('mongoose');
const tagsSchema  = mongoose.Schema({
        tag:{
            type:String,
            require:true,
        }
})
module.export = tags =mongoose.model('tags',tagsSchema)