var express = require('express');
var router = express.Router();

// import Sequelize
var sequelize = require('../models').sequelize; 
//import Book model
const Book = require("../models/").Book;

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
  //post new book to database
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const year = req.body.year;

  try {
    console.log(req.body);
    const book = await Book.create();

  } catch (error) {
    console.log("there was an error", error);
  }
  // create new book entry
  // get the data from the form
  // post data to database
  // create entry in sequelize
  console.log(req.body);
  res.send('form submited');


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