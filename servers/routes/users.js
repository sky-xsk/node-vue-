var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型
/* GET users listing. */

//注册
router.post('/createUser', function(req, res, next) {
    User.find({"account":req.body.account},function(err,result){
        if (err) {
            res.json({ error: "出现服务器错误！", code: -2 })
            return;
        }
        if (result.length != 0) {
            res.json({ error: "用户名被占用", code: -1 })
            return;
        }
        var user = new User({
           account: req.body.account,
           password: req.body.password
        });
        user.save(function(err) {
            if (err) {
                throw err;
            }
            console.log('用户保存成功!');
            res.json({ success: true, code: 1});
        });
    })
});

//登录
router.post('/logins', function(req,res,next){
    User.find({"account":req.body.account},function(err,result){
        if(err){
          res.json({ error: "出现服务器错误！", code: -2 })
          return;
        }
        //用户名不存在
        if (result.length == 0) {
          res.json({error:"用户名不存在",code:-1}); 
          return;
        }
        //用户名存在，判断密码是否正确
        if(req.body.password == result[0].password){
          res.json({ data: "登录成功", code: 1 })
          return;
        }else{
          res.json({ data: "密码错误", code: -3})
          return;
        }
    })
})



module.exports = router;
