const jwt = require("jsonwebtoken");

const tokenExpiratonTimeInSeconds = 3 * 60;

exports.getToken = (user) => {
  return jwt.sign({ user }, "topSecret", {
    expiresIn: tokenExpiratonTimeInSeconds,
  });
};
exports.isValidEmail = (email) =>
  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
