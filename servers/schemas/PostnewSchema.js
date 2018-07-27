var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var postnewSchema = new Schema({
    name: String,
    desc: String,
    authors: String,
    date: Date,
    zan:Boolean
});
module.exports = postnewSchema;