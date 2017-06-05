/**
 * app主程序入口
 */

var express = require('express');
//模版框架
var swig = require('swig');

//创建APP应用
var app = express();

//定义当前模版引擎
//第一个参数：模版引擎名称，同时也是模版引擎后缀，第二个参数表示用于解析处理的方法。

app.engine('html', swig.renderFile);
//设置模版文件存放的目录，第一个必须是views,第二个是文件夹名
app.set('views', './views');

//注册所使用的模版引擎，第一个参数必须是view engine,第二个是和engine一直的
app.set('view engine', 'html');

app.get('/', function (req, res, next) {
    res.send('<h1>欢迎');
});

app.listen(8888);