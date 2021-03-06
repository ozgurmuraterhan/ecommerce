const mongoose = require("mongoose");
const ProductCategoryModel = require("../models/ProductCategory");
const {
  validateCreateProductCategory,
  validateEditProductCategory,
} = require("../shared/validator/ProductCategoryValidator");

const getProductCategories = async (req, res, next) => {
  try {
    let query = {};

    // filters
    let isPublished = req.query.isPublished || true;

    const productCategories = await ProductCategoryModel.find(
      { isPublished },
      {},
      query
    ).exec();
    res.status(200).json({
      meta: {
        totalPages: 1,
        totalCount: productCategories.length,
        date: Date.now(),
      },
      data: productCategories,
    });
  } catch (error) {
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const getProductCategories_temp = async (req, res, next) => {
  try {
    let pageNumber = parseInt(req.query.pageNumber) || 1;
    let pageSize = parseInt(req.query.pageSize) || 2000;
    let sortField = req.query.sortField || "createDate";
    let sortOrder = req.query.sortOrder == "desc" ? -1 : 1;
    let sort = { [sortField]: sortOrder };
    // sort = {
    //   dataField: "createDate",
    //   order: "asc",
    // };
    // .sort( '-createdOn' )
    // .sort({ createDate: -1 })
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
    // query.sort = createDate - 1;
    // var totalPages = Math.ceil(totalCount / pageSize)

    ProductCategoryModel.find(
      {
        isPublished,
      },
      {},
      query
    )
      // .sort({ createDate: -1 })
      .sort(sort)
      .exec()
      .then((result) => {
        res.status(200).json({
          meta: {
            totalPages: 1,
            totalCount: result.length,
            date: Date.now(),
          },
          data: result,
        });
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

const getProductCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productCategory = await ProductCategoryModel.findById(id);
    res.status(200).json({
      meta: {},
      data: productCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const addProductCategory = async (req, res, next) => {
  try {
    const { error } = validateCreateProductCategory(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const productCategory = new ProductCategoryModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      description: req.body.description,
      isPublished: req.body.isPublished,
      pictureUrl: req.file.filename,
    });

    await productCategory.save((error, productCategory) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          error: `server error -> ${error}`,
        });
      } else {
        res.status(201).json({
          message: "productCategory created",
          productCategoryId: productCategory._id,
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

const editProductCategory = async (req, res, next) => {
  try {
    const productCategoryId = req.body.id;

    const productCategory = {
      name: req.body.name,
      description: req.body.description,
      isPublished: req.body.isPublished,

      price: req.body.price,
      countInStock: req.body.countInStock,
      category: req.body.productCategoryId,
    };
    if (req.file) {
      productCategory.pictureUrl = req.file.filename;
    }

    ProductCategoryModel.findByIdAndUpdate(productCategoryId, productCategory, {
      new: true,
    }).exec((error, product) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          error: `server error -> ${error}`,
        });
      } else {
        res.status(200).json({
          message: "productCategory is Updated :D",
          id: productCategory._id,
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

const deleteProductCategory = (req, res, next) => {
  try {
    const productCategoryId = req.params.id;
    ProductCategoryModel.findByIdAndDelete(productCategoryId).exec(
      (error, productCategory) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: `server error -> ${error}` });
        } else {
          // TODO : DELETE PRODUCT Category PICTURE
          res.status(200).json({
            message: "productCategory deleted",
            id: productCategory._id,
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `server error -> ${error}` });
  }
};

module.exports = {
  getProductCategories,
  getProductCategoryById,
  addProductCategory,
  editProductCategory,
  deleteProductCategory,
};
