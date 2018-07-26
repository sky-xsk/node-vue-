var express = require('express');
var router = express.Router();
var Postnew = require('../models/Postnew');// 引入模型
/* GET home page. */
router.post('/', function(req, res, next) {
    var postnewValue = new Postnew({
       name: req.body.name,
       desc: req.body.desc,
       authors: req.body.authors,
       date: new Date()
    });
    
    postnewValue.save(function(err){
        if(err){
          res.json({ data:"文章发布失败", code: -1});
          return;
        }
        res.json({ success: true, code: 1});
    })

});

router.get('/getlist',function(req,res,next){
    Postnew.find({},function(err,result){
        if(err){
          res.json({ data:"文章获取失败", code: -1});
          return;
        }
        res.json({ data: result, code: 1});
    })
});

router.get('/getOne/:id',function(req,res,next){
    var ids = req.params.id;
    Postnew.find({_id:ids},function(err,result){
        if(err){
          res.json({ data:"文章详细获取失败", code: -1});
          return;
        }
        res.json({ data: result[0], code: 1});
    })
});

router.delete('/deldetOne/:id',function(req,res,next){
  var ids = req.params.id;
  Postnew.remove({_id:ids},function(err,result){
      if(err){
        res.json({ data:"文章详细删除失败", code: -1});
        return;
      }
      res.json({ data: result, code: 1});
  })
});


module.exports = router;
