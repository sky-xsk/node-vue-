var mongoose = require('mongoose');
var commentSchema = require('../schemas/commentSchema');

var comment = mongoose.model('comment',commentSchema);
module.exports = comment;