const ProductModel = require("../models/Product");
const {
  validateCreateProduct,
  validateEditProduct,
} = require("../shared/validator/ProductValidator");

const getProducts = async (req, res, next) => {
  try {
    // await Product.find().populate('category') // This will also populate category along with product

    // await Product.find({category: catId}).populate('category'); //conditional find statement

    ProductModel.find()
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

const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    ProductModel.findById(id)
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

const addProduct = (req, res, next) => {
  try {
    const { error } = validateCreateProduct(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const product = new ProductModel({
      // category: req.body.categoryId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      pictureUrl: req.file.filename,
    });

    product
      .save()
      .then((result) => {
        res.status(201).json({
          message: "product created",
          createdProduct: result,
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

const editProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "product Not Found !!!" });
    }

    const { error } = validateEditProduct(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // product.categoryId = req.body.categoryId;
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    product.pictureUrl = req.file.filename;

    await product.save();
    res.status(200).json({ message: "product is Updated :D" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `server error -> ${error}`,
    });
  }
};

const deleteProduct = (req, res, next) => {
  try {
    const id = req.params.id;
    ProductModel.remove({ _id: id })
      .then((result) => {
        // TODO : DELETE PRODUCT PICTURE
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
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
};
