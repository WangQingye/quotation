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

/**
* 用户注册
* 1、用户名不能为空
* 2、密码不能为空
* 3、两次密码必须一致
* 数据库：
* 1、用户名是否已经被注册
* 2、
*/
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
                    password:password,
                });
            return user.save();
        }
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        responseData.message = '注册成功';
        res.json(responseData);
    });
});

/**
 * 用户登陆
*/
router.post('/user/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

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

    //查询数据库中是否有此用户名，并验证密码
    User.findOne({
        username:username,
        password:password
    }).then(function (userinfo) {
        if(!userinfo)
        {
            responseData.code = 3;
            responseData.message = '用户名不存在或密码错误';
            res.json(responseData);
            return;
        }
        //找到了userinfo,并且密码匹配
        responseData.message = '登陆成功';
        responseData.userInfo = {
            user_id:userinfo._id,
            username:userinfo.username
        };
        //可以把设置cookies的这一段复制到注册界面，实现注册后自动登陆的效果
        req.cookies.set('userInfo',JSON.stringify({
            user_id:userinfo._id,
            username:userinfo.username
        }));
        res.json(responseData);
    })
});

/**
 * 用户退出
 * */
router.get('/user/logout', function (req, res,next) {
    req.cookies.set('userInfo', null);
    responseData.message = '退出成功';
    res.json(responseData);
});


module.exports = router;