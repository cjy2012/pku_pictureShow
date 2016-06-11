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

        return new Promise(function(resolve, reject){
            request("https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token="+token+"&code="+code, function(err, res, data){
                console.log("userinfo:"+data);
                resolve(JSON.parse(data));
            });
        });
    }).catch(function(err){
        console.log(err);
    });
}

module.exports = {
    getUserInfo: getUserInfo
};