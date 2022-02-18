var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const models = require('./models/index.js');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
let testRouter = require('./routes/test');

var app = express();

//sequelize
models.sequelize.sync().then(()=> {
  console.log("DB 연결 성공");
}).catch(err=> {
  console.log("연결 실패");
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//세션 설정
app.use(session({
  //세션 키값
  key: 'sj',
  //세션 비밀키
  secret: 'secret',
  //세션을 항상 저장할지 여부
  resave: false,
  //세션이 저장되기전에 uninitialized 상태로 만들어 저장
  saveUninitialized: true,
  //쿠키 유효시간
  cookie: {
    maxAge: 24000 * 60 * 60 // 24시간
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/test', testRouter);

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
