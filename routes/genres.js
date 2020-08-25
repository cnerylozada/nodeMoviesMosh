const express = require("express");
const { validateGenre, Genre } = require("../models/genre");
const router = express.Router();
const { genreNotFound } = require("../util/errors");

router.get("/", async (req, res) => {
  const genres = await Genre.find().select("-__v");
  res.status(200).send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id).select("-__v");
  !!genre ? res.status(302).send(genre) : res.status(404).send(genreNotFound);
});

router.post("/", async (req, res) => {
  try {
    await validateGenre(req.body);
    const newGenre = await new Genre(req.body).save();
    res.status(201).send(newGenre);
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await validateGenre(req.body);
    const genreEdited = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    res.status(202).send(genreEdited);
  } catch (error) {
    res.status(400).send(!!error.errors ? error.errors : genreNotFound);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Genre.deleteOne(req.params.id);
  } catch (error) {
    res.status(400).send(genreNotFound);
  }
});

module.exports = router;