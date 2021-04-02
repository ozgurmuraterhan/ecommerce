const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

const {
  validateCreateUser,
  validateLoginUser,
} = require("../shared/validator/UserValidator");

const register = async (req, res, next) => {
  try {
    const { error } = validateCreateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // 1 - get username - password
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const avatar = req.file.path;

    // 2 - check username for repeat it
    let user = await UserModel.findOne({ username: username });
    if (user) {
      return res.status(409).json({
        message: "User Exists!",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3 - create user
    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
      role: role,
      avatar: avatar,
    });

    await newUser.save();

    const token = await newUser.generateAuthToken();

    return res
      .header("Access-Control-Expose-headers", "x-auth-token")
      .header("x-auth-token", token)
      .status(200)
      .json({
        message: "User registered successfully :D",
        user: {
          username: username,
        },
        token: token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // 1 - get username and password
    const username = req.body.username;
    const password = req.body.password;

    // 2 - is exist user?
    let user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "User not found !!!" });
    }

    // 3 - if user exist, check for is correct password
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(400).json({ message: "User not found !!!" });
    }

    // 4 - login
    const token = await user.generateAuthToken();

    return res
      .header("Access-Control-Expose-headers", "x-auth-token")
      .header("x-auth-token", token)
      .status(200)
      .json({
        message: "Login Successful",
        user: {
          username: username,
        },
        token: token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

exports.register = register;
exports.login = login;
