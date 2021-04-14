const mongoose = require("mongoose");
const ProductModel = require("../models/Product");
const ProductCategoryModel = require("../models/ProductCategory");
const {
  validateCreateProduct,
  validateEditProduct,
} = require("../shared/validator/ProductValidator");

const getProducts = async (req, res, next) => {
  try {
    let pageNumber = parseInt(req.query.pageNumber) || 1;
    let pageSize = parseInt(req.query.pageSize) || 2000;
    let sortField = req.query.sortField || "createDate";
    let sortOrder = req.query.sortOrder == "desc" ? -1 : 1;
    let sort = { [sortField]: sortOrder };
    let query = {};

    // filters
    let isPublished = req.query.isPublished || true;

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

    const products = await ProductModel.find({ isPublished }, {}, query)
      .sort(sort)
      .populate("category")
      .exec();
    res.status(200).json({
      meta: {
        totalPages: 1,
        totalCount: products.length,
        date: Date.now(),
      },
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    await product.populate("category").execPopulate();
    res.status(200).json({
      meta: {},
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { error } = validateCreateProduct(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const product = new ProductModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      pictureUrl: req.file.filename,
      isPublished: req.body.isPublished,
      category: req.body.productCategoryId,
    });

    await product.save((error, product) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          error: `server error -> ${error}`,
        });
      } else {
        res.status(201).json({
          message: "product created",
          productId: product._id,
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

const editProduct = async (req, res, next) => {
  try {
    const productId = req.body.id;

    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      isPublished: req.body.isPublished,
      category: req.body.productCategoryId,
    };
    if (req.file) {
      product.pictureUrl = req.file.filename;
    }

    ProductModel.findByIdAndUpdate(productId, product, { new: true }).exec(
      (error, product) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            error: `server error -> ${error}`,
          });
        } else {
          res.status(200).json({
            message: "product is Updated :D",
            product: product._id,
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

const deleteProduct = (req, res, next) => {
  try {
    const productId = req.params.id;
    ProductModel.findByIdAndDelete(productId).exec((error, product) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: `server error -> ${error}` });
      } else {
        // TODO : DELETE PRODUCT PICTURE
        res
          .status(200)
          .json({ message: "product deleted", productId: product._id });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `server error -> ${error}` });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
};
