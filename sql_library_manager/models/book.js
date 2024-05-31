"use strict";

const { db } = require("./index.js");

const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const { Model, DataTypes } = require("sequelize");

class Book extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Book.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a value for "title"',
        }
       
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a value for "author"',
        }
      },
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Book",
  });

  (async () => {
 
    try {
      await Book.sync();
      console.log('Book table has been synchronised');

      await sequelize.authenticate();
      console.log('Connection to database successful');
      
      const books = await Book.findAll();
      console.log(books); 
      
    } catch(error) {
      console.log('error connecting to the database', error);
    }
  
  }) ();
  

module.exports = Book;
