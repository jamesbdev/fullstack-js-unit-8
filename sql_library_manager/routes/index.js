var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/books');
});

router.get('/books', function(req, res, next){
  res.render('index', {title: 'Books'});
})

router.get('/new-book', function(req, res, next) {
  res.render('new-book', {title: 'New Book'});
})

module.exports = router;
