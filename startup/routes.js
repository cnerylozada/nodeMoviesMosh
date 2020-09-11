const express = require("express");
const customers = require("../routes/customers");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const signup = require("../routes/signup");
const login = require("../routes/login");
const logout = require("../routes/logout");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/signup", signup);
  app.use("/api/login", login);
  app.use("/api/logout", logout);
  app.use("/api/customers", customers);
  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
};
