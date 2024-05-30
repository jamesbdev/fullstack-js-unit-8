var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/books');
});

router.get('/books', function(req, res, next){
  res.render('index', {title: 'Books'});
})

router.get('/books/new', function(req, res, next) {
  res.render('new-book', {title: 'New Book'});
})

router.post('/books/new', function(req, res, next) {
  //post new book to database
  //create new book entry
})

module.exports = router;
