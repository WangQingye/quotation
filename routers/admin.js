/**
 * Created by wqy on 2017/6/5.
 */

var express = require('express');
var router = express.Router();

// /admin/user
router.use(function (req, res, next) {
    if(!req.userInfo.isAdmin){
       res.send('对不起，您不是管理员');
       return;
    }
    next();
});

router.get('/',function (req, res, next) {
    res.render('admin/index')
});

module.exports = router;