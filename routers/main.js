/**
 * Created by wqy on 2017/6/5.
 */


var express = require('express');
var router = express.Router();

// /
router.get('/', function (req, res, next) {
    res.render('main/index');
});
console.log(123);
module.exports = router;