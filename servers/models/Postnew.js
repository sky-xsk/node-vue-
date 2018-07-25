var mongoose = require('mongoose');
var postnewSchema = require('../schemas/postnewSchema');

var postnew = mongoose.model('postnew',postnewSchema);
module.exports = postnew;
