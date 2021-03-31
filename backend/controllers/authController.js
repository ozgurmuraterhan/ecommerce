const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

const signup = (req, res, next) => {
  // 1 - get username - password
  const username = req.body.username;
  const password = req.body.password;

  // 2 - check username for repeat it
  UserModel.find({ username: username }).then((user) => {
    if (user.length >= 1) {
      return res.status(409).json({
        msg: "User Exists!",
      });
    } else {
      bcrypt.hash(password, 12, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          // 3 - create user
          const user = new UserModel({
            username: username,
            password: hash,
          });
          user
            .save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                message: "User Created",
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                error: error,
              });
            });
        }
      });
    }
  });
};

const login = (req, res, next) => {
  // 1 - get username and password
  const username = req.body.username;
  const password = req.body.password;

  // 2 - is exist user?
  UserModel.find({ username: username }).then((user) => {
    if (user.length < 1) {
      return res.status(401).json({
        error: "Auth failed",
      });
    }

    // 3 - if user exist, check for is correct passsword
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: "Auth failed",
        });
      } else if (result) {
        // 4 - login

        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          "secret_Private_Key",
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          message: "Login Successful",
          user: {
            username: username,
          },
          token: token,
        });
      } else {
        res.status(401).json({
          error: "Auth failed",
        });
      }
    });
  });
};

exports.signup = signup;
exports.login = login;
