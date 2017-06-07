/**
 * Created by wqy on 2017/6/5.
 */


var express = require('express');
var router = express.Router();
var User = require('../models/user');

//统一返回格式
var responseData;

router.use(function (req, res, next) {
   responseData = {
       code: 0,
       message: ''
   };
   next();
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

    //数据验证
    if(username === '')
    {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if(password === '')
    {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    if(password !== repassword)
    {
        responseData.code = 3;
        responseData.message = '两次密码不一致';
        res.json(responseData);
        return;
    }

    /*数据库查询*/
    User.findOne({
       username:username
    }).then(function (userInfo) {
        console.log(userInfo);
        if(userInfo)
        {
            responseData.code = 4;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
        }else
        {
            var user = new User({
                    username:username,
                    password:password
                });
            return user.save();
        }
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        responseData.message = '注册成功';
        res.json(responseData);
    });
});

module.exports = router;