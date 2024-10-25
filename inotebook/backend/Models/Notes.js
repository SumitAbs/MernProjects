const mongoose = require('mongoose')

const NotesSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    tatg:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    }
});

module.exports = mongoose.model('notes',NotesSchema);