/**
 * Created by zhangwei on 16-6-11.
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var userPictureSchema = new Schema({
    userid:String,
    imgpath:String
 });

 exports.UserPicture = mongoose.model('UserPicture',userPictureSchema);