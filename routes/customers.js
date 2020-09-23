const express = require("express");
const { Customer, validateCustomer } = require("../models/customer");
const {
  itemWasNotFound,
  itemWasDeleted,
  invalidId,
} = require("../util/errors");
const { isValidObjectId } = require("../util/methods");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().select("-__v");
  res.status(200).send(customers);
});

router.get("/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id)) res.status(404).send(invalidId());
  const customer = await Customer.findById(req.params.id).select("-__v");
  !!customer
    ? res.status(302).send(customer)
    : res.status(404).send(itemWasNotFound("customer"));
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
    if (!isValidObjectId(req.params.id)) res.status(404).send(invalidId());
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
    res
      .status(400)
      .send(!!error.errors ? error.errors : itemWasNotFound("customer"));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) res.status(404).send(invalidId());
    await Customer.findByIdAndRemove(req.params.id);
    res.send(itemWasDeleted("customer"));
  } catch (error) {
    res.status(404).send(itemWasNotFound("customer"));
  }
});

module.exports = router;
