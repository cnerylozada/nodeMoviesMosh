const config = require("config");
const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provider");
  try {
    const decode = jsonwebtoken.verify(token, config.get("jwtPrivateKey"));
    req.payload = decode;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = auth;
