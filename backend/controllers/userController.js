const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  validateCreateUser,
  validateEditUser,
} = require("../shared/validator/UserValidator");

const getUsers = async (req, res, next) => {
  try {
    UserModel.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          error: `server error -> ${error}`,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    UserModel.findById(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          error: `server error -> ${error}`,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const addUser = (req, res, next) => {
  try {
    // 1 - get username - password - avatar
    const username = req.body.username;
    const password = req.body.password;
    const avatar = req.file.path;

    // 2 - check username for repeat it
    UserModel.find({ username: username }).then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User Exists!",
        });
      } else {
        // 3 - hash password
        bcrypt.hash(password, 12, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            // 4 - create user
            const { error } = validateCreateUser(req.body);
            if (error) {
              return res.status(400).json({ error: error.message });
            }
            const user = new UserModel({
              username: username,
              password: hash,
              avatar: avatar,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "user created",
                  createdUser: result,
                });
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({
                  error: `server error -> ${error}`,
                });
              });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "user Not Found !!!" });
    }

    const { error } = validateEditUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // user.categoryId = req.body.categoryId;
    user.username = req.body.username;
    user.password = req.body.password;
    user.avatar = req.file.filename;

    await user.save();
    res.status(200).json({ message: "user is Updated :D" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const deleteUser = (req, res, next) => {
  try {
    const id = req.params.id;
    UserModel.remove({ _id: id })
      .then((result) => {
        // TODO : DELETE PRODUCT PICTURE
        res.status(200).json(result);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: `server error -> ${error}` });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `server error -> ${error}` });
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
};
