const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const UsersSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
        default: Date.now
    }
});

const user      =   mongoose.model('users',UsersSchema);
module.exports  =   user;