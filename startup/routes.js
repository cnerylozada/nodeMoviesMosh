const express = require("express");
const customers = require("../routes/customers");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/customers", customers);
};
