var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.redirect('/books');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error("Sorry! We couldn't find the page you were looking for.");
  error.status = 404;
  res.locals.message = error.message;
  res.render('page-not-found', {error: error});
  //next(createError(404));
  next();
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (err.message == null || err.message == "") {
    err.message = "Sorry! There was an unexpected error on the server.";
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.status, "error status");
  console.log(err.message, "error message");
  // render the error page
  res.status(err.status || 500);
  res.render('error', { err });
});



module.exports = app;
