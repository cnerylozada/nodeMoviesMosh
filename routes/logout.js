const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send("you are logout");
});

module.exports = router;
