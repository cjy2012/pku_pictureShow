/**
 * Created by zhangwei on 16-4-15.
 */
var corpId = require("../config/wechatcfg").corpId;
var corpSecret = require("../config/wechatcfg").corpSecret;

var getToken = require("./token").getToken;

var request = require("request");

function getUserInfo(code){
    return getToken(corpId, corpSecret).then(function(res){
        var token = res.access_token;
        var params={
            auth_code:code
        }
        var opt={
            url:"https://qyapi.weixin.qq.com/cgi-bin/service/get_login_info?access_token="+token,
            method:'post',
            body:JSON.stringify(params)
        }
        return new Promise(function(resolve, reject){
            request(opt, function(err, res, data){
                console.log("userinfo:"+data);
                resolve(JSON.parse(data));
            });
        });
    }).catch(function(err){
        console.log(err);
    });
}

function getOpenId(userid){
    console.log('userid:',userid);
    return getToken(corpId, corpSecret).then(function(res){
        var token = res.access_token;
        var param={
            userid:userid
        }
        param = require('querystring').stringify(param);
        return new Promise(function(resolve, reject){

            request.post("https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_openid?access_token="+token,{form:param}, function(err, res, data){
                console.log("userinfo:"+data);
                resolve(JSON.parse(data));
            });
        });
    });
}

module.exports = {
    getUserInfo: getUserInfo,
    getOpenId:getOpenId
};