var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('./config/mongoose.js');
var db = mongoose();
var bodyParser = require('body-parser');
var util = require('util');
var session = require('express-session');
var server = require('http').Server(require('express')());
var io = require('socket.io')(server).listen(3030);
io.set('origins', '*:*');
//此处路由待优化
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postnewRouter = require('./routes/postnew');
var commentRouter = require('./routes/comment');

io.on('connection', function (socket) { 
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function(data){
    console.log(data);
  })
})

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000, ()=> console.log('listening on port 3000'));
//session
app.use(session({
  secret:'0',//加密的字符串，里面内容可以随便写
  resave:false,//强制保存session,即使它没变化
  saveUninitialized:true, //强制将未初始化的session存储，默认为true
  cookie : {
    maxAge : 1000*60*60, // 设置 session 的有效时间，单位毫秒
  },
}))

//socket.io


app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/postnew', postnewRouter);
app.use('/api/comment', commentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
