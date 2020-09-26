const express = require("express");
const { Movie, validateMovie } = require("../models/movie");
const { itemWasNotFound, itemWasDeleted } = require("../util/errors");
const { Genre } = require("../models/genre");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().select("-__v");
  res.status(200).send(movies);
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).send(movie);
  } catch (error) {
    res.status(404).send(itemWasNotFound("movie"));
  }
});

router.post("/", auth, async (req, res) => {
  try {
    await validateMovie(req.body);
    const genre = await Genre.findById(req.body.genreId).select("-__v");
    const movie = await new Movie({
      title: req.body.title,
      genre: genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    }).save();
    res.status(201).send(movie);
  } catch (error) {
    !!error.errors
      ? res.status(400).send(error.errors)
      : res.status(404).send(itemWasNotFound("genre"));
  }
});

router.put("/:id", async (req, res) => {
  try {
    await validateMovie(req.body);
    const genre = await Genre.findById(req.body.genreId).select("-__v");
    const movieEdited = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
      { new: true }
    );
    res.status(202).send(movieEdited);
  } catch (error) {
    !!error.errors
      ? res.status(400).send(error.errors)
      : res.status(404).send(itemWasNotFound("genre"));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.send(itemWasDeleted("movie"));
  } catch (error) {
    res.status(400).send(itemWasNotFound("movie"));
  }
});

module.exports = router;
