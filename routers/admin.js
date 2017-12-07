/**
 * Created by wqy on 2017/6/5.
 */

var express = require('express');
var router = express.Router();
var axios = require('axios');
//引入用户数据模型
var User = require('../models/user');
//引入分类模型
var Good = require('../models/good');
//引入内容模型
var Content = require('../models/content');
// /admin/user
// router.use(function (req, res, next) {
//     if(!req.userInfo)
//     {
//         res.send('对不起，您还没有登陆');
//     }
//     if(!req.userInfo.isAdmin){
//        res.send('对不起，您不是管理员');
//        return;
//     }
//     next();
// });

/**
 * 首页
 * */
router.get('/',function (req, res) {
    // 获取一下今天的天气
    axios.get('https://weixin.jirengu.com/weather/now?cityid=WM6N2PM3WY2K')
    .then(function(response)
    {
        weather = response.data.weather;
        res.render('admin/index', {
            weather: weather,
            userInfo:req.userInfo
        })
    })
    .catch(function(err)
    {
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
 * 产品管理
 * */
router.get('/good', function (req, res) {

    var page =  Number(req.query.page || 1); //请求页数
    var limit = 10; //每页的限制
    var skip = 0; //根据页数计算需要跳过的条数，动态计算
    var totalPage = 0;

    Good.count()
        .then(function (count) {
            totalPage = Math.ceil(count / limit);
            //设置page的范围
            page = Math.min(page, totalPage);
            page = Math.max(page, 1);

            skip = (page - 1) * limit;

            Good.find().sort({_id:-1}).skip(skip).limit(limit)
                .then(function (goods) {
                    res.render('admin/category', {
                        userInfo:req.userInfo,
                        goods:goods,
                        page:page,
                        totalPage:totalPage,
                        type:'category'
                    })
                });
        });
});
//获取添加页面
router.get('/good/add', function (req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    })
});
//保存分类
router.post('/good/add', function (req, res) {
    var goodname = req.body.goodname;
    var goodprice = req.body.goodprice;
    var gooddes = req.body.gooddes;
    var goodimg = req.body.goodimg;
    console.log(req.body);
    //简单判断
    if(!goodname)
    {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message:"产品的名称不能为空"
        });
        return;
    }else if(goodname.length > 5)
    {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message:"名称长度超过限制"
        });
        return;
    }else if(!goodprice){
        res.render('admin/error',{
            message: "商品是一定要有价格的哦^_^"
        })
    }

    Good.findOne({
        goodname:goodname
    }).then(function (good) {
       //数据库中存在该分类
       if(good)
       {
           res.render('admin/error', {
               userInfo: req.userInfo,
               message:"已经有这个产品了"
           });
           return Promise.reject();
       }else {
           return new Good({
               goodname: goodname,
               goodprice: goodprice,
               gooddes: gooddes,
               goodimg: goodimg
           }).save();
       }
    }).then(function (newgood) {
        console.log(newgood);
        res.render('admin/success', {
            userInfo: req.userInfo,
            message:"分类保存成功",
            url: '/admin/good'
        });
    });

});
//分类修改
router.get('/good/edit', function (req, res) {

    //获取要修改的分类信息，并且以表单的信息展示
    var id = req.query.id || '';

    Good.findOne({
        _id:id
    }).then(function (good) {
        console.log(good);
        if(!good)
        {
            res.render('admin/error', {
                userInfo:req.userInfo,
                message:'分类信息不存在'
            })
        }else
        {
            res.render('admin/good_edit', {
                userInfo:req.userInfo,
                good:good
            })
        }
    })
});
router.post('/good/edit', function (req, res) {

    //获取要修改的分类信息，并且以表单的信息展示
    var id = req.query.id || '';
    var goodname = req.body.goodname;
    var goodprice = req.body.goodprice;
    var gooddes = req.body.gooddes;
    var goodimg = req.body.goodimg;
    Good.findOne({
        _id:id
    }).then(function (good) {
        console.log(good);
        if(!good)
        {
            res.render('admin/error', {
                message:'分类信息不存在'
            });
            return Promise.reject();
        }else
        {
            // 找到不等现在这个ID，但是名字相同的（说明输入了与数据库中有相同名称的产品）
            return Good.findOne({
                    _id:{$ne: id},
                    goodname:goodname
            });
        }
    }).then(function (sameGood) {
        if(sameGood)
        {
            console.log('same', sameGood);
            res.render('admin/error', {
                message:'数据库中已经存在这种商品了哦'
            });
            return Promise.reject();
        }else
        {
            return Good.update({
                _id:id
            },{
                goodname: goodname,
                goodprice: goodprice,
                gooddes: gooddes,
                goodimg: goodimg
            });
        }
    }).then(function () {
       res.render('admin/success', {
           message:'修改成功',
           url: '/admin/good'
       });
    });
});
//分类删除
router.get('/good/delete', function (req, res) {
    //获取要删除的ID
    var id = req.query.id;
    Good.remove({
        _id:id
    }).then(function () {
        res.render('admin/success', {
            message:'删除成功',
            url:'/admin/good'
        });
    })
});

/**
 * 内容管理
 * */
// 内容读取
router.get('/content', function (req, res) {
    var page =  Number(req.query.page || 1); //请求页数
    var limit = 10; //每页的限制
    var skip = 0; //根据页数计算需要跳过的条数，动态计算
    var totalPage = 0;
    Content.count()
        .then(function (count) {
            totalPage = Math.ceil(count / limit);
            //设置page的范围
            page = Math.min(page, totalPage);
            page = Math.max(page, 1);

            skip = (page - 1) * limit;

            Content.find().sort({_id: -1}).skip(skip).limit(limit).populate('category')
                .then(function (contents) {
                    res.render('admin/content', {
                        userInfo: req.userInfo,
                        contents: contents,
                        page: page,
                        totalPage: totalPage,
                        type: 'contents'
                    })
                });
        });
});

// 内容添加
router.get('/content/add', function (req, res) {
    Category.find().sort({_id: -1}).then(function (categories) {
        res.render('admin/content_add', {
            userInfo: req.userInfo,
            categories: categories
        });
        console.log(categories)
    });
});

// 内容保存
router.post('/content/add', function(req, res){
   console.log(req.body);
   if (req.body.category === '')
   {
       res.render('admin/error', {
           userInfo: req.userInfo,
           message: '内容不能为空'
       });
       return;
   }
   if (req.body.title === '')
   {
       res.render('admin/error', {
           userInfo: req.userInfo,
           message: '标题不能为空'
       });
       return;
   }

   // 通过验证，保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).save().then(function(rs){
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        });
    });

});

// 内容修改
router.get('/content/edit', function (req, res) {

    //获取要修改的文章ID
    var id = req.query.id;
    Category.find().sort({_id: -1}).then(function (categories) {
        Content.findOne({
            _id: id
        }).populate('category').then(function (content) {
            if (!content) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '指定内容不存在'
                })
                return Promise.reject();
            } else {
                res.render('admin/content_edit', {
                    userInfo: req.userInfo,
                    categories: categories,
                    content: content
                })
            }
        })
    });
});

// 保存修改
router.post('/content/edit', function(req, res){

    var id = req.query.id;

    if (req.body.category === '')
    {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容不能为空'
        });
        return;
    }
    if (req.body.title === '')
    {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '标题不能为空'
        });
        return;
    }

    // 通过验证，保存数据到数据库
    Content.update({
        _id: id
    }, {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        })
    })

});

// 内容删除
router.get('/content/delete', function (req, res) {

    //获取要删除的ID
    var id = req.query.id;

    Content.remove({
        _id:id
    }).then(function () {
        res.render('admin/success', {
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/content'
        });
    })
});

module.exports = router;