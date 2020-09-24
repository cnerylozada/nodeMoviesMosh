const express = require("express");
const { User, validateUser } = require("../models/users");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.post("/", async (req, res) => {
  try {
    await validateUser(req.body);
    const user = await new User(req.body).save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

module.exports = router;
