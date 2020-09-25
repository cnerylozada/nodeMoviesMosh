const express = require("express");
const { validateUser, User } = require("../models/users");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await validateUser(req.body);
    const { email, password } = req.body;
    await User.login(email, password);
    res.status(201).send("login!");
  } catch (error) {
    if (!!error.errors) {
      res.status(400).send(error.errors);
    } else {
      const { status, message } = JSON.parse(error.message);
      res.status(status).send({ status, message });
    }
  }
});

module.exports = router;
