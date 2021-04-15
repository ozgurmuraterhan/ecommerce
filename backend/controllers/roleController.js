const mongoose = require("mongoose");
const RoleModel = require("../models/Role");

const {
  validateCreateRole,
  validateEditRole,
} = require("../shared/validator/RoleValidator");

const getRoles = async (req, res, next) => {
  try {
    const roles = await RoleModel.find().populate("role").exec();
    res.status(200).json({
      meta: {
        totalCount: roles.length,
        date: Date.now(),
      },
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await RoleModel.findById(id);
    res.status(200).json({
      meta: {},
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const addRole = async (req, res, next) => {
  try {
    const { error } = validateCreateRole(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const role = new RoleModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      description: req.body.description,
    });

    await role.save((error, role) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          error: `server error -> ${error}`,
        });
      } else {
        res.status(201).json({
          message: "role created",
          roleId: role._id,
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

const editRole = async (req, res, next) => {
  try {
    const roleId = req.body.id;

    const role = {
      name: req.body.name,
      description: req.body.description,
    };

    RoleModel.findByIdAndUpdate(roleId, role, { new: true }).exec(
      (error, role) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            error: `server error -> ${error}`,
          });
        } else {
          res.status(200).json({
            message: "role is Updated :D",
            id: role._id,
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
};

const deleteRole = (req, res, next) => {
  try {
    const roleId = req.params.id;
    RoleModel.findByIdAndDelete(roleId).exec((error, role) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: `server error -> ${error}` });
      } else {
        res.status(200).json({ message: "role deleted", roleId: role._id });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `server error -> ${error}` });
  }
};

module.exports = {
  getRoles,
  getRoleById,
  addRole,
  editRole,
  deleteRole,
};
