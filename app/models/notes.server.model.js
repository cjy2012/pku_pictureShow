/**
 * Created by zhangwei on 16-5-5.
 */
var Waterline = require('waterline');
module.exports = Waterline.Collection.extend({
    identity: 'notes',
    connection: 'mysql',
    schema: true,
    attributes: {
        title: {
            type: 'string',
            required: true,
        },
        author:'string',
        tag:'string',
        content:'string',
    },
    // 生命周期回调
    //beforeCreate: function (value, cb) {
    //    value.createTime = new Date();
    //    return cb();
    //},
    print:function(value){
        console.log('\tTitle:', value.title, 'create at:', value.createTime);
        console.log('\tContent:', value.content);
    }
});