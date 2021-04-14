const path = require("path");
const router = require("express").Router();
const multer = require("multer");

const productCategoryController = require("../controllers/productCategoryController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/public/productCategories/");
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

//@desc   GET all productCategories from db
//@route  GET /api/v1/productCategory
//@access Public
router.get("/", productCategoryController.getProductCategories);

//@desc   GET a productCategory by id from db
//@route  GET /api/v1/productCategory/:id
//@access Public
router.get("/:id", productCategoryController.getProductCategoryById);

//@desc   POST a productCategory to db
//@route  POST /api/v1/productCategory
//@access Admin, ProductCategoriesManager
router.post("/", upload, productCategoryController.addProductCategory);

//@desc   PUT(edit) a productCategory from db
//@route  PUT(edit) /api/v1/productCategory/:id
//@access Admin, ProductCategoriesManager
router.put("/", upload, productCategoryController.editProductCategory);

//@desc   DELETE a productCategory by id from db
//@route  DELETE /api/v1/productCategory/:id
//@access Admin
router.delete("/:id", productCategoryController.deleteProductCategory);

module.exports = router;
