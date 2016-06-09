var express =require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var url=require('url');

module.exports = function(){
    console.log('express initialing...');
    var app = express();

    //定义EJS模板引擎和模板文件位置
    app.set('views',path.join(__dirname,'../views'));
    app.set('view engine','ejs');

    //定义静态文件目录
    app.use(express.static(path.join(__dirname,'../public')));

    //定义数据解析器
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    //建立session模型
    app.use(session({
        secret:'1234',
        name:'pictrueboard',
        cookie:{maxAge:1000*60*20},//设置session的保存时间为20分钟
        resave:false,
        saveUninitialized:true
    }));
  
    // 统一处理出错的情况
    app.use(function(err, req, res, next){
        if(!err) {return next()}
        res.status(500);
        try {
            return res.json(err.message || 'server error');
        } catch(e) {
            console.error('500 set header after sent');
        }
    });

    require('../app/routes/routes')(app);
    require('../app/routes/user.routes')(app);
    app.use(function(req, res, next){
        res.status(404);
        try {
          return res.json('Not Found');
        } catch(e) {
          console.error('404 set header after sent');
        } 
      });


    return app;
}