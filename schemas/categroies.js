/**
 * Created by wqy on 2017/6/11.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//用户表结构
var categorySchema = new Schema(
    {
        name:String
    }
);

module.exports = categorySchema;