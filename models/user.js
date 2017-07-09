var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//Schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
//Model
module.exports = mongoose.model("User",UserSchema);