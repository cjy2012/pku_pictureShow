/**
 * Created by zhangwei on 16-5-5.
 */
var Waterline = require('waterline');
module.exports = Waterline.Collection.extend({
    identity: 'users',
    connection: 'mysql',
    schema: true,
    attributes: {
        username: {
            type: 'string',
            // 校验器
            required: true
        },
        password:{
            type:'string',
        },
        email:{
            type:'string',
        },
    },
    // 生命周期回调
    //beforeCreate: function(value, cb){
    //    value.createTime = new Date();
    //    return cb();
    //},
    print:function(value){
        console.log('\tUsername:', value.username, 'create at:', value.createTime);
    }
});