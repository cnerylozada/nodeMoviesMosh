const jwt = require("jsonwebtoken");
const config = require("config");

const tokenExpiratonTimeInSeconds = 3 * 60;

exports.getToken = (user) => {
  return jwt.sign({ user }, config.get("jwtPrivateKey"), {
    expiresIn: tokenExpiratonTimeInSeconds,
  });
};
exports.isValidEmail = (email) =>
  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
