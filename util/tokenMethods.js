const jwt = require("jsonwebtoken");

const tokenExpirationInSeconds = 3 * 60;

const createToken = (user) => {
  return jwt.sign({ user }, "the ninja", {
    expiresIn: tokenExpirationInSeconds,
  });
};

module.exports = {
  tokenExpirationInSeconds,
  createToken,
};
