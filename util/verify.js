var express = require('express');  
var app = express();  
  
function toWeb(req,res) {  
    res.status(200).send("User Message");  
}  
  
function verifyServer(req,res) {  
     var echostr = req.query.echostr;  
     var sign = req.query.signature;  
     var timestamp = req.query.timestamp;  
     var nonce = req.query.nonce;  
     console.log('recv weixin req:'," sign",sign,"timestamp",timestamp,"nonce",nonce,"echostr",echostr);  
     res.status(200).send(""+echostr);  
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