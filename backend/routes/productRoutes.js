const path = require("path");
const router = require("express").Router();
const multer = require("multer");

const productController = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/public/products/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
}).single("pictureUrl");

//@desc   GET all products from db
//@route  GET /api/v1/product
//@access Public
router.get("/", productController.getProducts);

//@desc   GET a product by id from db
//@route  GET /api/v1/product/:id
//@access Public
router.get("/:id", productController.getProductById);

//@desc   POST a product to db
//@route  POST /api/v1/product
//@access Admin, ProductsManager
router.post("/", upload, productController.addProduct);

//@desc   PUT(edit) a product from db
//@route  PUT(edit) /api/v1/product/:id
//@access Admin, ProductsManager
router.put("/", upload, productController.editProduct);

//@desc   DELETE a product by id from db
//@route  DELETE /api/v1/product/:id
//@access Admin
router.delete("/:id", productController.deleteProduct);

module.exports = router;
