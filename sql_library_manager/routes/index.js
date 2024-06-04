var express = require('express');
var router = express.Router();

// import Sequelize
var sequelize = require('../models').sequelize; 
//import Book model
const Book = require("../models/").Book;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/books');
});

//show home page with list of books
router.get('/books', async function(req, res, next){
  //display all books
  try {
    const books = await Book.findAll();
    //show the template and pass the books 
    res.render('index', {title: "Books", books: books });
  } catch (error) {
    console.log('There is an error', error);
  }

}) 

//get the new book page
router.get('/books/new', function(req, res, next) {
  res.render('new-book', {title: 'New Book'});
})

//create book route
router.post('/books/new', async function(req, res, next) {
  //create book entry
  try {
    const book = await Book.create(req.body);

  } catch (error) {
    console.log("there was an error", error);
  }

  res.send('book entry added');


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
