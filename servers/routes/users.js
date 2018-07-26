var express = require('express');
var router = express.Router();
var path = require("path");
var formidable = require('formidable');
var fs = require("fs");
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
           password: req.body.password,
           avatar:''
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
});

//上传头像
router.post('/avatars',function(req,res,next){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.normalize(__dirname + "/../avatar");
   
    form.parse(req, function (err, fields, files) {
        if(err){
            res.json({ data: "图片上传失败", code: -1});
            return;
        }
        var oldpath = files.file.path;
        var newpath = path.normalize(__dirname + "/../avatar") + "/" + new Date().getTime() + ".jpg";
        //图片重名
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                res.send("重命名失败");
            }
        });
    })
    form.on('end', function() {
        res.json({data:'图片上传完成', code:1});
        console.log("上传完成");
    });
});

module.exports = router;
