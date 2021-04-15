require("dotenv").config();
const jwtPrivateKey = process.env.jwtPrivateKey;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const config = require("config");

const schemaOptions = {
  timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
};

const userSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    // role: { type: Number, required: true, default: 1 },
    isActive: { type: Boolean, required: true, default: false },
    avatar: { type: String, required: false },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Role",
    },
  },
  schemaOptions
);

userSchema.methods.generateAuthToken = function () {
  const data = {
    _id: this._id,
    username: this.username,
    role: this.role,
  };

  // const token = jwt.sign(data, config.get("jwtPrivateKey"));
  const token = jwt.sign(data, jwtPrivateKey);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
