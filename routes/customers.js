const express = require("express");
const { Customer, validateCustomer } = require("../models/customer");
const { customerNotFound } = require("../util/errors");

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().select("-__v");
  res.status(200).send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id).select("-__v");
  !!customer
    ? res.status(302).send(customer)
    : res.status(404).send(customerNotFound);
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

router.put("/:id", async (req, res) => {
  try {
    await validateCustomer(req.body);
    const customerEdited = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
      { new: true }
    );
    res.status(202).send(customerEdited);
  } catch (error) {
    res.status(400).send(!!error.errors ? error.errors : customerNotFound);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Customer.deleteOne(req.params.id);
  } catch (error) {
    res.status(404).send(customerNotFound);
  }
});

module.exports = router;
