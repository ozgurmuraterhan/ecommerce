const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "شما اجازه دسترسی به این دیتا را ندارید" });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.userData = decoded;
    next();
  } catch (ex) {
    return res
      .status(401)
      .json({ message: "شما اجازه دسترسی به این دیتا را ندارید" });
  }
};
