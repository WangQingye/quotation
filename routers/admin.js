/**
 * Created by wqy on 2017/6/5.
 */

var express = require('express');
var router = express.Router();

//引入用户数据模型
var User = require('../models/user');

// /admin/user
router.use(function (req, res, next) {
    if(!req.userInfo.isAdmin){
       res.send('对不起，您不是管理员');
       return;
    }
    next();
});

/**
 * 首页
 * */
router.get('/',function (req, res) {
    res.render('admin/index', {
        userInfo:req.userInfo
    })
});

/**
 * 用户管理
 * */
router.get('/user', function (req, res) {

    //从数据库读取用户记录
    //并且限制每页条数 .limit()
    //实现翻页，需要跳过前面的页 .skip( 页数-1 * 每页数量limit )

    var page =  Number(req.query.page || 1); //请求页数
    var limit = 10; //每页的限制
    var skip = 0; //根据页数计算需要跳过的条数，动态计算
    var totalPage = 0;

    User.count()
        .then(function (count) {
            totalPage = Math.ceil(count/limit);
            //设置page的范围
            page = Math.min(page, totalPage);
            page = Math.max(page, 1);

            skip = (page - 1) * limit;

            User.find().skip(skip).limit(limit)
                .then(function (users) {
                    res.render('admin/user', {
                        userInfo:req.userInfo,
                        users:users,
                        page:page,
                        totalPage:totalPage
                    })
                });
        });
});

/**
 * 分类管理
 * */
router.get('/category', function (req, res) {
    res.render('admin/category', {
        userInfo: req.userInfo
    })
});


module.exports = router;