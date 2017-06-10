/**
 * Created by wqy on 2017/6/5.
 */


var express = require('express');
var router = express.Router();

// /
router.get('/', function (req, res, next) {
    console.log('11', req.userInfo);
    res.render('main/index',{
        userInfo:req.userInfo
    });
});
module.exports = router;