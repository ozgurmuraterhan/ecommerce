const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
};

const productSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      min: [0, "Price must be bigger than 0"],
      required: [true, "Please insert price"],
    },
    countInStock: { type: Number, required: true },
    pictureUrl: { type: String, required: false },
    isPublished: { type: Boolean, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductCategory",
    },
  },
  schemaOptions
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
