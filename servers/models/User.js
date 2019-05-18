var mongoose = require('mongoose');
var UserSchema = require('../schemas/UserSchema');

var User = mongoose.model('User',UserSchema);
module.exports = User;





