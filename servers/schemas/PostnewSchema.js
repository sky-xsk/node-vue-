var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var postnewSchema = new Schema({
    name: String,
    desc: String,
    authors: String,
    date: Date
});
module.exports = postnewSchema;