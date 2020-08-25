const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
    validate: {
      validator: (v) => Number.isInteger(v),
      message: "numberInStock must be an integer",
    },
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: (v) => Number.isInteger(v),
      message: "dailyRentalRate must be an integer",
    },
  },
});

exports.Movie = mongoose.model("Movie", movieSchema);
