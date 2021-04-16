const jwt = require("jsonwebtoken");
const config = require("config");
const UserModel = require("../../models/User");
const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    await user.populate("role").execPopulate();
    console.log({ user });

    if (user.role.name !== "admin") {
      return res.status(403).json({ message: "Your haven't allowed role!" });
    }

    next();

    // const role = req.user.role;
    // if (rol === "Admin") return next();
    // else return res.estatus(401).send("You are not authenticated!");
  } catch (err) {
    console.log(err);
    return res.status(401).send("You are not authenticated!");
  }
};

module.exports = isAdmin;
