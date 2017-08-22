/**
 * Created by wqy on 2017/8/22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//内容表结构
var contentsSchema = new Schema(
    {
        /* 关联字段 - 分类id */
        category:{
            // 类型
            type: mongoose.Schema.Types.ObjectId,
            // 引用
            ref: 'Category'
        },
        /* 内容 */
        title: String,
        description: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        }
    }
);

module.exports = contentsSchema;