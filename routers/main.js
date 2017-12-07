/**
 * Created by wqy on 2017/6/5.
 */


var express = require('express');
var router = express.Router();
var Good = require('../models/good');

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
    res.render('main/index',{
    });
});
router.get('/goods', function (req, res, next) {
    Good.find().then(function (goods) {
        res.render('main/goods',{
            userInfo:req.userInfo,
            goods:goods
        });
    });
});
router.get('/goods/good', function (req, res, next) {
    var id = req.query.id;
    console.log(id);
    Good.findOne({
        _id: id
    }).then(function(good){
        res.render('main/good',{
            good: good
        })
    })
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