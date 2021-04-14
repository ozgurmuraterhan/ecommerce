const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
};

const productCategorySchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String, required: true },
    pictureUrl: { type: String, required: false },
    isPublished: { type: Boolean, required: true, default: true },
  },
  schemaOptions
);

productCategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

module.exports = ProductCategory;
