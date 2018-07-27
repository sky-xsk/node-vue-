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
//获取列表 添加分页
router.get('/getlist',function(req,res,next){
    //当前页   pages    
    //每页条数   perPage
    let pageSize = parseInt(req.query.perPage);
    let page = parseInt(req.query.pages);
    let skip = (page-1)*pageSize;
    let sorts = parseInt(req.query.sorts);
    Postnew.find({},function(err,results){
        if(err){
            res.json({ data:"文章获取失败", code: -1});
            return;
        }
        let goodsModel = Postnew.find({}).skip(skip).limit(pageSize).sort({'name':sorts});
        //计算分页后的数据
        goodsModel.exec(function(err,result){
            if(err){
                res.json({ data:"文章获取失败", code: -1});
                return;
            }
            res.json({ data: result, code: 1, results:results.length});
        })
    });
});

router.get('/getOne/:id',function(req,res,next){
    var ids = req.params.id;
    Postnew.find({_id:ids},function(err,result){
        if(err){
          res.json({ data:"文章详细获取失败", code: -1});
          return;
        }
        //存session 文章id
        req.session.ids = req.params.id;
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
