/**
 * Created by wqy on 2017/6/5.
 */


var express = require('express');
var router = express.Router();

// /admin/user
router.get('/user', function (req, res, next) {
    res.send('Api - user');
});

module.exports = router;