module.exports={
    user:function(req,res,next){
       res.render('index',{
            msg:"user"
        });
    }
}