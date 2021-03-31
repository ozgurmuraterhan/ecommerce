const ProductCategoryModel = require("../models/ProductCategory");
const {
  validateCreateProductCategory,
  validateEditProductCategory,
} = require("../shared/validator/ProductCategoryValidator");

const getProductCategories = async (req, res, next) => {
  try {
    ProductCategoryModel.find()
      .then((result) => {
        res.status(200).json(result);
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
    ProductCategoryModel.findById(id)
      .then((result) => {
        res.status(200).json(result);
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

const addProductCategory = (req, res, next) => {
  try {
    const { error } = validateCreateProductCategory(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const productCategory = new ProductCategoryModel({
      name: req.body.name,
    });

    productCategory
      .save()
      .then((result) => {
        res.status(201).json({
          message: "productCategory created",
          createdProductCategory: result,
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

const editProductCategory = async (req, res, next) => {
  try {
    const productCategoryId = req.params.id;
    const productCategory = await ProductCategoryModel.findById(
      productCategoryId
    );
    if (!productCategory) {
      return res.status(404).json({ error: "productCategory Not Found !!!" });
    }

    const { error } = validateEditProductCategory(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    productCategory.name = req.body.name;

    await productCategory.save();
    res.status(200).json({ message: "productCategory is Updated :D" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const deleteProductCategory = (req, res, next) => {
  try {
    const id = req.params.id;
    ProductCategoryModel.remove({ _id: id })
      .then((result) => {
        // TODO : DELETE PRODUCT CATEGORY PICTURE
        res.status(200).json(result);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: `server error -> ${error}` });
      });
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
