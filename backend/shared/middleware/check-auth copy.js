const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ message: "You are not authenticated!" });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    console.log("decoded-token", decoded);
    req.userData = decoded;
    next();
  } catch (ex) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
};
