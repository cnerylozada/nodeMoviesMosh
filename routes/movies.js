const express = require("express");
const { Movie, validateMovie } = require("../models/movie");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().select("-__v");
  res.status(200).send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.status(302).send(movie);
});

router.post("/", async (req, res) => {
  try {
    await validateMovie(req.body);
    const movie = await new Movie(req.body).save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

module.exports = router;
