const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
};

const roleSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  schemaOptions
);

roleSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "role",
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
