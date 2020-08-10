const express = require("express");
const Customer = require("../models/customer");

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.status(200).send(customers);
});

module.exports = router;
