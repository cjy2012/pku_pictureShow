var uploadpath=require('../../config/common.js').upload_path;
var multiparty = require('multiparty');
var fs = require('fs');
var WXBizMsgCrypt=require('wechat-crypto');
var config = require('../../config/wechatcfg');
var getUserId = require('../../util/user').getUserId;
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
    picturesShow:function(req,res,next){
        var msg="";
        var  param={};
        var page=req.query.page;
        if(!page){
            msg="软微男神女神";
        }else if(page=="male"){
            msg="软微男神";
            param.gender="1";
        }else{
            msg="软微女神";
            param.gender="2";
        }
        UserPicture.find(param,function(err,picturesList){
            console.log(picturesList)
            res.render('picturesShow',{
                img:picturesList,
                msg:msg
            });
        });
    },
    upload:function(req,res,next){
        if(req.session.userinfo){
            UserPicture.findOne({userid:req.session.userinfo.userid},function(err,userPicture){
                res.render('upload',{
                    img:userPicture.imgpath,
                    msg:req.session.userinfo.name+'的个人中心',
                    name:req.session.userinfo.name,
                    weixinid:req.session.userinfo.weixinid,
                    userid:req.session.userinfo.userid,
                    headimg:req.session.userinfo.avatar
                });
            })
        }else{
            var code = req.query.code;
            console.log(code);
             getUserId(code).then(function(data){
                console.log("data",data);
                //req.session.userId=data.UserId;
                getUserInfo(data.UserId).then(function(data1){
                    req.session.userinfo=data1;
                    UserPicture.findOne({userid:data.UserId},function(err,userPicture){
                        if(err){
                            console.log(err);
                        }
                        if(userPicture){
                            res.render('upload',{
                                img:userPicture.imgpath,
                                msg:req.session.userinfo.name+'的个人中心',
                                name:req.session.userinfo.name,
                                weixinid:req.session.userinfo.weixinid,
                                userid:req.session.userinfo.userid,
                                headimg:req.session.userinfo.avatar
                            });
                        }else{
                            res.render('upload',{
                                img:"",
                                msg:req.session.userinfo.name+'的个人中心',
                                name:req.session.userinfo.name,
                                weixinid:req.session.userinfo.weixinid,
                                userid:req.session.userinfo.userid,
                                headimg:req.session.userinfo.avatar
                            });
                        }
                    });
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
                var imgpath=files.upload[0].path;
                //if already exist 
                UserPicture.findOne({userid:req.session.userinfo.userid},function(err1,userPicture){
                    if(err1){
                        console.log('find error: ' + err1);
                    }
                    if(userPicture){
                        UserPicture.update({_id:userPicture._id},{imgpath:imgpath.substring(imgpath.indexOf('public')+6)},function(err,doc){
                            console.log('updated :',doc);
                            return res.redirect('/picturesShow');
                        })
                    }else{
                        var newUserPicture = new UserPicture({
                            userid:req.session.userinfo.userid,
                            username:req.session.userinfo.name,
                            mobile:req.session.userinfo.mobile,
                            gender:req.session.userinfo.gender,
                            weixinid:req.session.userinfo.weixinid,
                            avatar:req.session.userinfo.avatar,
                            imgpath:imgpath.substring(imgpath.indexOf('public')+6)
                        })
                        newUserPicture.save(function(err,doc){
                            if(err){
                                console.log(err);
                            }else{
                                console.log('uploaded ok,',doc);
                                return res.redirect('/picturesShow');
                            }
                        })
                    }
                })
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
            });
        });
    }
}