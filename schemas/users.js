/**
 * Created by wqy on 2017/6/5.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//用户表结构
var userSchema = new Schema(
    {
        username:String,
        password:String
    }
);

module.exports = userSchema;