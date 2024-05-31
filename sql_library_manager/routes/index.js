var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/books');
});

//show home page with list of books
router.get('/books', function(req, res, next){
  res.render('index', {title: 'Books'});
  //display list of books
    //pass in book object
    //loop through book object entries
    //display books info
})

//get the new book page
router.get('/books/new', function(req, res, next) {
  res.render('new-book', {title: 'New Book'});
})

//create book route
router.post('/books/new', function(req, res, next) {
  //post new book to database
  //create new book entry
})

//get the update book page
router.get('/books/:id', function(req, res, next) {
  res.render('update-book', {title: 'Update Book'});
})

//update book route
router.post('/books/:id', function(req, res, next) {
  //update book
})

//delete book route
router.post('/books/:id/delete', function(req, res, next) {
  //delete a book 
})

module.exports = router;
