const router = require("express").Router();

const productCategoryController = require("../controller/productCategoryControllers");

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
//@access Admin, ProductManager
router.post("/", productCategoryController.addProductCategory);

//@desc   PUT(edit) a productCategory from db
//@route  PUT(edit) /api/v1/productCategory/:id
//@access Admin, ProductManager
router.put("/:id", productCategoryController.editProductCategory);

//@desc   DELETE a productCategory by id from db
//@route  DELETE /api/v1/productCategory/:id
//@access Admin
router.delete("/:id", productCategoryController.deleteProductCategory);

module.exports = router;
