var express = require('express');  
var app = express();
var WXBizMsgCrypt=require('wechat-crypto');
var config = require('../config/wechatcfg');
  
function toWeb(req,res) {  
    res.status(200).send("User Message");  
}  
  
function verifyServer(req,res) {  
     /*var echostr = req.query.echostr;  
     var sign = req.query.msg_signature;  
     var timestamp = req.query.timestamp;  
     var nonce = req.query.nonce;  
     console.log('recv weixin req:'," sign",sign,"timestamp",timestamp,"nonce",nonce,"echostr",echostr);  

     res.status(200).send(""+echostr); */
    var echostr = req.query.echostr;
    var crypto = new WXBizMsgCrypt(config.token, config.encodingAESKey, config.corpId);
    var s = crypto.decrypt(echostr);
    console.log('echostr 解密后：',s);
    res.send(s.message);
}  
  
app.get('/test',function(req,res) {  
    res.send("Hello Dear");  
});  
  
app.get('/wechat', function(req, res) {  
    var echostr = req.query.echostr;  
    if(echostr=='' || echostr == undefined || echostr==null) {  
         toWeb(req,res);  
    }  
    else {  
         verifyServer(req,res);  
    }  
});  
  
  
var server = app.listen(8088,function() {  
    console.log('Listening on port %d',server.address().port);  
});