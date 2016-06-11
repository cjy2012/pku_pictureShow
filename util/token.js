/**
 * Created by zhangwei on 16-4-15.
 */

var request = require('request');
var fs = require('fs');

function getToken(corpid, corpsecret){
    console.log("get token");
    return new Promise(function(resolve, reject){
        var token;

        //先看是否有token缓存，这里选择用文件缓存，可以用其他的持久存储作为缓存
        if(fs.existsSync('token.dat')){
            console.log("token exist!");
            token = JSON.parse(fs.readFileSync('token.dat'));
        }

        //如果没有缓存或者过期
        if(!token || token.timeout < Date.now()){
            request('https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid='+corpid+'&corpsecret=' + corpsecret, function(err, res, data){
                var result = JSON.parse(data);
                result.timeout = Date.now() + 7000000;
                //更新token并缓存
                //因为access_token的有效期是7200秒，每天可以取2000次
                //所以差不多缓存7000秒左右肯定是够了
                fs.writeFileSync('token.dat', JSON.stringify(result));
                resolve(result);
            });
        }else{
            resolve(token);
        }

    });
}

module.exports = {getToken: getToken};