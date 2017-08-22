/**
 * Created by wqy on 2017/8/22.
 */
var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Contents', contentsSchema);