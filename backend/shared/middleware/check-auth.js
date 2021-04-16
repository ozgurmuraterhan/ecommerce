require("dotenv").config();
const jwtPrivateKey = process.env.jwtPrivateKey;
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwtPrivateKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Your haven't allowed role!" });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
};

module.exports = authenticateJWT;
