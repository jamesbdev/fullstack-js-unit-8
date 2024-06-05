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
    //redirect to homepage
    res.redirect('/books');
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      //show template with form error
      res.render('new-book', {title: "New Book", errors: error.errors})
    } else {
      console.log("there was an error", error);
      //show global error template
      res.render("error", err = error)
    }
  }
})

//get the update book page
router.get('/books/:id', async function(req, res, next) {
  //get book ID from params
  const bookId = req.params.id;
  try {
    const book = await Book.findByPk(bookId);
    const errorMessage = "Sorry, this book entry is invalid";

    //render update template and pass book, bookId and title variables
    if (book != null ) {
      res.render('update-book', {title: 'Update Book', book , bookId});
    } else {
      console.log("book does not exist");
      res.render('page-not-found', {message: errorMessage})
    }

  } catch (error) {
    console.log("Sorry, there was an error when displaying the Update book template:", error);
    
  }

})

//update book route
router.post('/books/:id', async function(req, res, next) {
  //update book
  try {
    const book = await Book.findByPk(req.params.id);
    //update book entry with new information
    await book.update(req.body);
    //redirect to homepage
    res.redirect('/books');
  } catch (error) {
    //check if error is Sequelize error 
    if(error.name === "SequelizeValidationError") {
      //show template with form error
      res.render('update-book', {title: "Update Book", errors: error.errors})
    } else {
      console.log("Sorry, there is an error when updating the book", error);
    }
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
    //redirect to homepage
    res.redirect('/books');
  } catch (error) {
    console.log("Sorry there is an error deleting the book", error);
  }
  
})

module.exports = router;
