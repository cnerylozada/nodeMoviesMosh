const express = require("express");
const { validateUser, User } = require("../models/users");
const { getToken } = require("../util/methods");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await validateUser(req.body);
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const jwt = user.getToken();
    res.status(201).send(jwt);
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
