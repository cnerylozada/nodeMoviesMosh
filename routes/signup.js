const express = require("express");
const { validateUser, User } = require("../models/user");
const {
  createToken,
  tokenExpirationInSeconds,
} = require("../util/tokenMethods");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send(req.cookies);
});

router.post("/", async (req, res) => {
  try {
    await validateUser(req.body);
    const user = await new User(req.body).save();
    const token = createToken({ id: user._id, email: user.email });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: tokenExpirationInSeconds * 1000,
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

module.exports = router;
