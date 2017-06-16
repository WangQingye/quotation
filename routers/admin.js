/**
 * Created by wqy on 2017/6/5.
 */

var express = require('express');
var router = express.Router();

//引入用户数据模型
var User = require('../models/user');
//引入分类模型
var Category = require('../models/category');

// /admin/user
router.use(function (req, res, next) {
    if(!req.userInfo)
    {
        res.send('对不起，您还没有登陆');
    }
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
                        totalPage:totalPage,
                        type:'user'
                    })
                });
        });
});

/**
 * 分类管理
 * */
router.get('/category', function (req, res) {

    var page =  Number(req.query.page || 1); //请求页数
    var limit = 10; //每页的限制
    var skip = 0; //根据页数计算需要跳过的条数，动态计算
    var totalPage = 0;

    Category.count()
        .then(function (count) {
            totalPage = Math.ceil(count / limit);
            //设置page的范围
            page = Math.min(page, totalPage);
            page = Math.max(page, 1);

            skip = (page - 1) * limit;

            Category.find().sort({_id:-1}).skip(skip).limit(limit)
                .then(function (categories) {
                    res.render('admin/category', {
                        userInfo:req.userInfo,
                        categories:categories,
                        page:page,
                        totalPage:totalPage,
                        type:'category'
                    })
                });
        });
});
//获取添加页面
router.get('/category/add', function (req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    })
});
//保存分类
router.post('/category/add', function (req, res) {
    var name = req.body.name;

    //简单判断
    if(!name)
    {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message:"输入的名称不能为空"
        });
        return;
    }else if(name.length > 5)
    {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message:"名称长度超过限制"
        });
        return;
    }

    Category.findOne({
        name:name
    }).then(function (category) {
       //数据库中存在该分类
       if(category)
       {
           res.render('admin/error', {
               userInfo: req.userInfo,
               message:"已经有这个分类了"
           });
           return Promise.reject();
       }else {
           return new Category({
               name:name
           }).save();
       }
    }).then(function (newCategory) {
        console.log(newCategory);
        res.render('admin/success', {
            userInfo: req.userInfo,
            message:"分类保存成功",
            url: '/admin/category'
        });
    });

});
//分类修改
router.get('/category/edit', function (req, res) {

    //获取要修改的分类信息，并且以表单的信息展示
    var id = req.query.id || '';

    Category.findOne({
        _id:id
    }).then(function (category) {
        console.log(category);
        if(!category)
        {
            res.render('admin/error', {
                userInfo:req.userInfo,
                message:'分类信息不存在'
            })
        }else
        {
            res.render('admin/category_edit', {
                userInfo:req.userInfo,
                category:category
            })
        }
    })
});
router.post('/category/edit', function (req, res) {

    //获取要修改的分类信息，并且以表单的信息展示
    var id = req.query.id || '';
    var name = req.body.name;
    Category.findOne({
        _id:id
    }).then(function (category) {
        console.log(category);
        if(!category)
        {
            res.render('admin/error', {
                userInfo:req.userInfo,
                message:'分类信息不存在'
            });
            return Promise.reject();
        }else
        {
            //做一些判断
            if(name == category.name)
            {
                res.render('admin/success', {
                    userInfo:req.userInfo,
                    message:'修改成功',
                    url:'/admin/category'
                });
                return Promise.reject();
            }else
            {
                return Category.findOne({
                        _id:{$ne: id},
                        name:name
                });
            }
        }
    }).then(function (sameCategory) {
        if(sameCategory)
        {
            console.log('same', sameCategory);
            res.render('admin/error', {
                userInfo:req.userInfo,
                message:'数据库中已经存在同名分类'
            });
            return Promise.reject();
        }else
        {
            return Category.update({
                _id:id
            },{
                name:name
            });
        }
    }).then(function () {
       res.render('admin/success', {
           useInfo:req.userInfo,
           message:'修改成功',
           url: '/admin/category'
       });
    });
});
//分类删除
router.get('/category/delete', function (req, res) {

    //获取要删除的ID
    var id = req.query.id;

    Category.remove({
        _id:id
    }).then(function () {
        res.render('admin/success', {
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/category'
        });
    })
});

/**
 * 内容管理
 * */
router.get('/content', function (req, res) {
   res.render('admin/content', {
       userInfo:req.userInfo
   })
});

router.get('/content/add', function (req, res) {
    Category.find().then(function (categories) {
        res.render('admin/content_add', {
            userInfo:req.userInfo,
            categories:categories
        })
    });
});

console.log(13);

module.exports = router;