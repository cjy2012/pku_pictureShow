/**
 * Created by zhangwei on 16-4-15.
 */
var corpId = require("../config/wechatcfg").corpId;
var corpSecret = require("../config/wechatcfg").corpSecret;

var getToken = require("./token").getToken;

var request = require("request");

function getUserId(code){
    return getToken(corpId, corpSecret).then(function(res){
        var token = res.access_token;

        return new Promise(function(resolve, reject){
            request("https://qyapi.weixin.qq.com/cgi-bin/service/get_login_info?access_token="+token+"&code="+code, function(err, res, data){
                console.log("userinfo:"+data);
                resolve(JSON.parse(data));
            });
        });
    }).catch(function(err){
        console.log(err);
    });
}

function getUserInfo(userid){
    console.log('userid:',userid);
    return getToken(corpId, corpSecret).then(function(res){
        var token = res.access_token;
        var param={
            userid:userid
        }
        param = require('querystring').stringify(param);
        return new Promise(function(resolve, reject){

            request("https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token="+token+"&userid="+userid, function(err, res, data){
                console.log("userinfo:"+data);
                resolve(JSON.parse(data));
            });
        });
    });
}

module.exports = {
    getUserId: getUserId,
    getOpenId:getOpenId
};