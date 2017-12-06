/**
 * Created by wqy on 2017/6/5.
 */


var express = require('express');
var router = express.Router();
var Category = require('../models/category');

// /
// router.get('/', function (req, res, next) {

//     Category.find().then(function (categories) {
//         res.render('main/index',{
//             userInfo:req.userInfo,
//             categories:categories
//         });
//     });
// });
router.get('/', function (req, res, next) {
    Category.find().then(function (categories) {
        res.render('main/index',{
            userInfo:req.userInfo,
            categories:categories
        });
    });
});
router.get('/goods', function (req, res, next) {
    res.render('main/goods',{
    });
});
router.get('/clients', function (req, res, next) {
    res.render('main/clients',{
    });
});
// router.get('/admin', function (req, res, next) {
//     res.render('main/clients',{
//     });
// });
module.exports = router;