var express = require('express');
var router = express.Router();
var comment = require('../models/comment');// 引入模型

router.post('/', function(req, res, next) {
   var comments = new comment({
        commentCont:req.body.contents,
        commentuUsername: req.session.username,
        commentId: req.session.ids,
        commentDate: new Date()
   });
   comments.save(function(err){
       if(err){
         res.json({ error: "出现服务器错误！", code: -1 })
         return;
       }
       res.json({ success: true, code: 1});
   })
});
//根据文章的id获取文章的评论信息
router.get('/details/:id',function(req,res,next){
    var commentIds = req.params.id;
    comment.find({commentId:commentIds},function(err,result){
        if(err){
            res.json({ error:"评论列表获取失败", code: -1});
        }
        res.json({ data:result, code: 1});
    })
});
 



module.exports = router;
