/**
 * Created by wqy on 2017/6/5.
 */

var mongoose = require('mongoose');
var userSchema = require('../schemas/users');

module.exports = mongoose.model('User', userSchema);