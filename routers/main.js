/**
 * Created by wqy on 2017/6/5.
 */


var express = require('express');
var router = express.Router();
var Category = require('../models/category');

// /
router.get('/', function (req, res, next) {

    Category.find().then(function (categories) {
        res.render('main/index',{
            userInfo:req.userInfo,
            categories:categories
        });
    });


});
module.exports = router;