const mongoose = require("mongoose");
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  validateCreateUser,
  validateEditUser,
} = require("../shared/validator/UserValidator");

const getUsers = async (req, res, next) => {
  try {
    let pageNumber = parseInt(req.query.pageNumber) || 1;
    let pageSize = parseInt(req.query.pageSize) || 2000;
    let sortField = req.query.sortField || "createDate";
    let sortOrder = req.query.sortOrder == "desc" ? -1 : 1;
    let sort = { [sortField]: sortOrder };
    let query = {};

    // filters
    let isActive = req.query.isPublished || true;

    if (pageNumber < 0 || pageNumber === 0) {
      response = {
        error: true,
        message: "invalid page number, should start with 1",
      };
      return res.status(404).json({
        meta: {
          date: Date.now(),
        },
        error: {
          error: true,
          message: "invalid page number, should start with 1",
        },
      });
    }

    query.skip = pageSize * (pageNumber - 1);
    query.limit = pageSize;

    const users = await UserModel.find({ isActive }, {}, query)
      .sort(sort)
      // .populate("category")
      .exec();
    res.status(200).json({
      meta: {
        totalPages: 1,
        totalCount: users.length,
        date: Date.now(),
      },
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    // await user.populate("role").execPopulate();
    res.status(200).json({
      meta: {},
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const addUser = async (req, res, next) => {
  try {
    // 1 - check username for repeat it
    const user = UserModel.find({ username: req.body.username });
    if (user.length >= 1) {
      return res.status(409).json({
        meta: {},
        error: { message: "User Exists!" },
      });
    } else {
      // 2 - get username - password - avatar
      const username = req.body.username;
      const password = req.body.password;
      const role = req.body.role;
      const isActive = req.body.isActive;
      const avatar = req.file.path;

      // 3 - hash password
      const salt = 12;
      const hashedPassword = await bcrypt.hash(password, salt);

      // 4 - create user
      const { error } = validateCreateUser(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: hashedPassword,
        role: role,
        isActive: isActive,
        avatar: avatar,
      });

      await user.save((error, user) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            error: `server error -> ${error}`,
          });
        } else {
          res.status(201).json({
            message: "user created",
            userId: user._id,
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const password = req.body.password;

    //  hash password
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
      isActive: req.body.isActive,
    };
    if (req.file) {
      user.avatar = req.file.filename;
    }

    UserModel.findByIdAndUpdate(userId, user, { new: true }).exec(
      (error, user) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            error: `server error -> ${error}`,
          });
        } else {
          res.status(200).json({
            message: "user is Updated :D",
            id: user._id,
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }

  // try {
  //   const userId = req.body.id;
  //   const user = await UserModel.findById(userId);
  //   if (!user) {
  //     return res.status(404).json({ error: "user Not Found !!!" });
  //   }

  //   const { error } = validateEditUser(req.body);
  //   if (error) {
  //     return res.status(400).json({ message: error.message });
  //   }

  //   // user.categoryId = req.body.categoryId;
  //   user.username = req.body.username;
  //   user.password = req.body.password;
  //   user.role = req.body.role;
  //   user.isActive = req.body.isActive;
  //   user.avatar = req.file.filename;

  //   await user.save();
  //   res.status(200).json({ message: "user is Updated :D" });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({
  //     error: `server error -> ${error}`,
  //   });
  // }
};

const deleteUser = (req, res, next) => {
  try {
    const userId = req.params.id;
    UserModel.findByIdAndDelete(userId).exec((error, user) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: `server error -> ${error}` });
      } else {
        // TODO : DELETE USER AVATAR
        res.status(200).json({ message: "user deleted", userId: user._id });
      }
    });

    // UserModel.remove({ _id: id })
    //   .then((result) => {
    //     // TODO : DELETE USER AVATAR
    //     res.status(200).json(result);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     res.status(500).json({ error: `server error -> ${error}` });
    //   });
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
