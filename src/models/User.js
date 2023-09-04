const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    typeAccount:{
        type:String,
        default:"normal"
    }
})
  
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User)