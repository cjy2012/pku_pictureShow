var uploadpath=require('../../config/common.js').upload_path;
var multiparty = require('multiparty');
var fs = require('fs');
var WXBizMsgCrypt=require('wechat-crypto');
var config = require('../../config/wechatcfg');

module.exports={
    index:function(req,res,next){
        res.render('index',{
            msg:"index"
        });
    },
    upload:function(req,res,next){
        res.render('upload',{
            msg:"upload"
        });
    },
    doupload:function(req,res,next){
        var form = new multiparty.Form({uploadDir:'public/'+uploadpath});
        form.parse(req,function(err,fields,files){
            var filesTmp = JSON.stringify(files,null,2);
            if(err){
               console.log('parse error: ' + err);
            } else {
                //console.log('parse files: ' + filesTmp);
                // var inputFile = files.upload[0];
                // var uploadedPath = inputFile.path;
                // var dstPath = uploadpath + inputFile.originalFilename;
                // //重命名为真实文件名
                // fs.rename(uploadedPath, dstPath, function(err) {
                //     if(err){
                //         console.log('rename error: ' + err);
                //     } else {
                //         console.log('rename ok');
                //         res.redirect('/upload');
                //     }
                // });
                console.log('upload ok');
                var imgpath=files.upload[0].path;
                res.redirect(imgpath.substring(imgpath.indexOf('public')+6));
            }
        });
    },
    wechat:function(req,res,next){
        var postdata = "";
        req.addListener("data",function(postchunk){
            postdata+=postchunk;
        });
        //获取到了POST数据
        req.addListener("end",function(){
            var parseString = require('xml2js').parseString;
            parseString(postdata,function(err,result){
                var crypto = new WXBizMsgCrypt(config.token, config.encodingAESKey, config.corpId);
                var s = crypto.decrypt(result.xml.Encrypt[0]);
                console.log('解密后：',s);
            });
        });
    }
}