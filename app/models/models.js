/**
 * Created by zhangwei on 16-6-11.
 */
 var mongoose = require('mongoose');
 var schema = mongoose.schema;

 var userPictureSchema = new schema({
    userid:String,
    imgpath:String
 });

 exports.UserPicture = mongoose.model('UserPicture',userPictureSchema);