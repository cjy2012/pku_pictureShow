var uploadpath=require('../../config/common.js').upload_path;
var multiparty = require('multiparty');
var fs = require('fs');
var WXBizMsgCrypt=require('wechat-crypto');
var config = require('../../config/wechatcfg');
var getUserInfo = require('../../util/user').getUserInfo;
var models = require('../models/models');
//加载models
var UserPicture = models.UserPicture;

module.exports={
    index:function(req,res,next){
        res.render('index',{
            msg:"index"
        });
    },
    upload:function(req,res,next){
        if(req.session.userId){
            UserPicture.findOne({userid:req.session.userId},function(err,userPicture){
                res.render('upload',{
                    img:userPicture.imgpath,
                    msg:'个人中心'
                });
            })
        }else{
            var code = req.query.code;
            console.log(code);
             getUserInfo(code).then(function(data){
                console.log(data);
                req.session.userId=data.UserId;
                UserPicture.findOne({userid:data.UserId},function(err,userPicture){
                    if(err){
                        console.log(err);
                    }
                    if(userPicture){
                        res.render('upload',{
                            img:userPicture.imgpath,
                            msg:'个人中心'
                        });
                    }else{
                        res.render('upload',{
                            msg:'个人中心'
                        });
                    }
                });
            });
         }
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
                var imgpath=files.upload[0].path;
                var newUserPicture = new UserPicture({
                    userid:req.session.userId,
                    imgpath:imgpath.substring(imgpath.indexOf('public')+6)
                })
                newUserPicture.save(function(err,doc){
                    if(err){
                        console.log(err);
                        return res.render('register',{
                            user:req.session.user,
                            username:username,
                            password:password,
                            passwordRepeat:passwordRepeat,
                            err:'内部错误，请重试！',
                            pageTitle:'注册'
                        });
                    }else{
                        console.log(doc);
                        return res.redirect('/upload');
                    }
                })
                console.log('upload ok');
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
                //parseString(s.message,function(err,result1){
                        //console.log(result1);
                        //console.log(result1.xml.FromUserName[0]);
                //})
            });
        });
    }
}