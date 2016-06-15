微信企业号平台应用：照片墙

1、组员信息
   1501210882-陈计云
   1501211039-章伟

2、系统功能概述
    主要是为大家提供一个分享校园光影的平台，软微学院同学可以发布自己的照片在上面进行展示。
首先支持照片上传、替换，这相当于一个照片采集器；
然后可以查看平台所有的照片；
最后根据性别，可以分类查看软微男神、女神！

3、数据库设计
数据库采用MongoDB，数据表UserPicture具体字段如下所示：
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


4、系统部署运行说明
    系统采用MVC的架构来搭建，这样控制逻辑十分清晰，可维护性和可修改性大大提高。
系统文件的主要结构如下所示：
---app
   ---controllers:业务处理逻辑控制
   ---models:数据库模型设计
   ---routers:页面请求路由控制
---bin
   ---www:系统服务启动程序
---config:相关参数的配置文件
---public:静态文件，例如css、js、imgs等
---routes:页面跳转控制
---util:微信的相关验证和处理文件
---views:静态ejs页面文件
   系统运行，需要相关的数据库、以及下载系统依赖的第三方库文件。
   系统初始启动程序为bin文件夹下的www文件。



