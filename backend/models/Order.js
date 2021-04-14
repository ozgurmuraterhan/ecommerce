const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
