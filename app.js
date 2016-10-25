var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require('./settings');
//session管理
var session = require('express-session');
//session存储在mongodb中
var MongoStore = require('connect-mongo')(session);
//信息写入flash，下次显示完毕后被清除 //什么意思。。
var flash = require('connect-flash');
var livereload = require('connect-livereload');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(flash());
app.use(livereload({port:35729}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
   secret: settings.cookieSecret,
   key: settings.db,
   cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
   saveUninitialized: true,
   resave: true,
   store: new MongoStore({
      url: 'mongodb://localhost:27017/workblog'
   })
}));

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({code: '404'});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({code: '500'});
});


module.exports = app;
