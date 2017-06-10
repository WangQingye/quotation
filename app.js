/**
 * app主程序入口
 */

var express = require('express');
//模版框架
var swig = require('swig');
//加载数据库mokuai
var mongoose = require('mongoose');
//用来出来post提交过来的数据
var bodyParser = require('body-parser');
//解析cookies
var Cookies = require('cookies');
//用户模型
var User = require('./models/user');

//创建APP应用
var app = express();

//定义当前模版引擎
//第一个参数：模版引擎名称，同时也是模版引擎后缀，第二个参数表示用于解析处理的方法。

app.engine('html', swig.renderFile);
//设置模版文件存放的目录，第一个必须是views,第二个是文件夹名
app.set('views', './views');

//注册所使用的模版引擎，第一个参数必须是view engine,第二个是和engine一直的
app.set('view engine', 'html');

//静态资源目录
app.use('/public', express.static(__dirname + '/public'));
//解析请求数据
app.use(bodyParser.urlencoded({extended:true}));
//设置cookie
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);

    //解析登陆用户的cookie信息
    if(req.cookies.get('userInfo'))
    {
        try
        {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登陆用户的类型（是否是管理员）
            User.findById(req.userInfo.user_id)
                .then(function (userInfo) {
                    req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                    next();
                })
        }catch (e){
            next();
        }
    }else {
        next();
    }

});


//开发过程中取消缓存机制
swig.setDefaults({cache:false});



// app.get('/', function (req, res, next) {
//
//     /**
//      * @param 读取views目录下的制定文件，解析并返回给客户端
//      * @param 传递给模版使用数据
//      */
//     res.render('index');
// });

/**
 * 根据不同的功能划分模块
 */
app.use('/', require('./routers/main'));
app.use('/api', require('./routers/api'));
app.use('/admin', require('./routers/admin'));

mongoose.connect('mongodb://localhost:27017/blog', function (err) {
    if(err)
    {
        console.log('数据库连接失败');
    }else
    {
        console.log('数据库连接成功');
        app.listen(8888);
    }
});
//app.listen(8888);

