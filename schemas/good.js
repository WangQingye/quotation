/**
 * Created by wqy on 2017/12/7.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//产品表结构
var goodSchema = new Schema(
    {
        goodname: String,
        goodprice: String,
        gooddes: String,
        goodimg: String,   
    }
);

module.exports = goodSchema;