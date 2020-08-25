const express = require("express");
const { Movie } = require("../models/movie");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.status(200).send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.status(302).send(movie);
});

router.post("/", async (req, res) => {
  try {
    const movie = await new Movie(req.body).save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
