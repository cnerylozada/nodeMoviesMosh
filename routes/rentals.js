const express = require("express");
const { validateRental, Rental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { itemWasNotFound } = require("../util/errors");
const { Movie } = require("../models/movie");
const router = express.Router();

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  try {
    await validateRental(req.body);
    const customer = await Customer.findById(req.body.customerId).select(
      "-__v"
    );
    if (!customer) return res.status(400).send(itemWasNotFound("customer"));
    const movie = await Customer.findById(req.body.movieId);
    if (!movie) return res.status(400).send(itemWasNotFound("movie"));
    if (!movie.numberInStock) return res.status(400).send("Movie not in stock");
    res.status(201).send("new rental was created !");
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

module.exports = router;
