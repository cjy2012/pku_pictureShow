/**
 * Created by zhangwei on 16-6-11.
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var userPictureSchema = new Schema({
    userid:String,
    username:String,
    mobile:String,
    gender:String,
    weixinid:String,
    avatar:String,
    imgpath:String,
    createTime:{
        type:Date,
        default:Date.now
    }
 });

 exports.UserPicture = mongoose.model('UserPicture',userPictureSchema);