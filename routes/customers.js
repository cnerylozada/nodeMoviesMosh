const express = require("express");
const { Customer, validateCustomer } = require("../models/customer");

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().select("-__v");
  res.status(200).send(customers);
});

router.post("/", async (req, res) => {
  try {
    await validateCustomer(req.body);
    const newCustomer = await new Customer(req.body).save();
    res.status(201).send(newCustomer);
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

module.exports = router;
