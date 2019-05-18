var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var commentSchema = new Schema({
    commentCont:String,
    commentuUsername:String,
    commentId:String,
    commentDate: Date
});
module.exports = commentSchema;