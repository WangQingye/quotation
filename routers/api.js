/**
 * Created by wqy on 2017/6/5.
 */


var express = require('express');
var router = express.Router();

//统一返回格式
var responseData;

router.use(function () {
   responseData = {
       code: 0,
       message: ''
   }
});

/*
* 用户注册
* 1、用户名不能为空
* 2、密码不能为空
* 3、两次密码必须一致
* 数据库：
* 1、用户名是否已经被注册
* 2、*/
router.post('/user/signup', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    if(username === '')
    {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if(password === '')
    {
        responseData.code = 1;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    if(password !== repassword)
    {
        responseData.code = 1;
        responseData.message = '两次密码不一致';
        res.json(responseData);
    }
});

module.exports = router;