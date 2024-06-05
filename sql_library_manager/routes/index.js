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
router.get('/books/:id', async function(req, res, next) {
  //get book ID from params
  const bookId = req.params.id;
  try {
    const book = await Book.findByPk(bookId);
    //render update template and pass book, bookId and title variables
    res.render('update-book', {title: 'Update Book', book , bookId});
  } catch {
    console.log("Sorry, there was an error when displaying the Update book template", error);
  }

})

//update book route
router.post('/books/:id', async function(req, res, next) {
  //update book
  try {
    const book = await Book.findByPk(req.params.id);
    //update book entry with new information
    await book.update(req.body);
    //display confirmation message
    res.send("Book has been updated");
  } catch (error) {
    console.log("there is an error", error);
  }
})

//delete book route
router.post('/books/:id/delete', async function(req, res, next) {
  //store ID from the URL
  const bookId = req.params.id;
  try {
    const book = await Book.findByPk(bookId);
    //remove entry
    book.destroy();
    //send confirmation message
    res.send("Book has been deleted from database");
  } catch (error) {
    console.log("Sorry there is an error deleting the book", error);
  }
})

module.exports = router;
