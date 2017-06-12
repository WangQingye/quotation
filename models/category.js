/**
 * Created by wqy on 2017/6/11.
 */

var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categroies');

module.exports = mongoose.model('Category', categoriesSchema);