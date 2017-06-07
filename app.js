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
app.use(bodyParser.urlencoded({extended:true}));

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

