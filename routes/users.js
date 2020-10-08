const express = require("express");
const _ = require("lodash");
const auth = require("../middlewares/auth");
const { User, validateUser } = require("../models/users");
const { getToken } = require("../util/methods");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).select(["id", "email"]);
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    await validateUser(req.body);
    const isEmailInUse = await User.findOne({ email: req.body.email });
    if (!!isEmailInUse) res.status(400).send("Email is already in use");
    const user = await new User(_.pick(req.body, ["email", "password"])).save();
    const jwt = user.getToken();
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
