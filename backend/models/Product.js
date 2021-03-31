const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [0, "Price must be bigger than 0"],
    required: [true, "Please insert price"],
  },
  countInStock: { type: Number, required: true },
  pictureUrl: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
