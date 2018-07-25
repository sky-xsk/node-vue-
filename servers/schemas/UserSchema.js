var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var userSchema = new Schema({
    account:String,
    password:String
});
module.exports = userSchema;