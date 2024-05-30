'use strict';

const { db } = require("index.js");

const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        msg: 'Please enter a value for "title"',
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        msg: 'Please enter a value for "author"',
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};

(async () => {
  console.log(123);
  try {
    await Book.sync();
    console.log('Book table has been synchronised');
    await sequelize.authenticate();
    console.log('Connection to database successful')
  } catch(error) {
    console.log('error connecting to the database', error);
  }

})();
