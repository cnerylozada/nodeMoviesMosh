const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
const yup = require("yup");

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
    min: 0,
    max: 10,
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

exports.validateMovie = (movie) => {
  const schema = yup.object().shape({
    title: yup.string().min(2).max(30).required(),
    genreId: yup.string().required(),
    numberInStock: yup.number().integer().min(0).max(10).required(),
    dailyRentalRate: yup.number().integer().min(1).max(5).required(),
  });
  return schema.validate(movie, { abortEarly: false });
};

exports.Movie = mongoose.model("Movie", movieSchema);
