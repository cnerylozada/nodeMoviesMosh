const e = require("express");
const express = require("express");
const { validateUser, User } = require("../models/user");
const {
  createToken,
  tokenExpirationInSeconds,
} = require("../util/tokenMethods");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await validateUser(req.body);
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken({ id: user._id, email: user.email });
    res
      .status(200)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(user._id);
  } catch (error) {
    if (!!error.errors) res.status(400).send(error.errors);
    else {
      const errorState = JSON.parse(error.message);
      res.status(errorState.status).send(errorState);
    }
  }
});

module.exports = router;
