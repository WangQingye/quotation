/**
 * Created by wqy on 2017/6/11.
 */

var mongoose = require('mongoose');
var goodsSchema = require('../schemas/good');

module.exports = mongoose.model('Good', goodsSchema);