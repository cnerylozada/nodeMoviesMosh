const express = require("express");
const _ = require("lodash");
const { User, validateUser } = require("../models/users");
const { getToken } = require("../util/methods");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.post("/", async (req, res) => {
  try {
    await validateUser(req.body);
    const isEmailInUse = await User.findOne({ email: req.body.email });
    if (!!isEmailInUse) res.status(400).send("Email is already in use");
    const user = await new User(_.pick(req.body, ["email", "password"])).save();
    const jwt = getToken({ id: user._id, email: user.email });
    res
      .header("x-auth-token", jwt)
      .header("access-control-expose-headers", "x-auth-token")
      .status(201)
      .send(_.pick(user, ["_id", "email"]));
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

module.exports = router;
