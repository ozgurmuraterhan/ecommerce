const router = require("express").Router();

const orderController = require("../controllers/orderController");

//@desc   GET all orders from db
//@route  GET /api/v1/order
//@access Public
router.get("/", orderController.getOrders);

//@desc   GET a order by id from db
//@route  GET /api/v1/order/:id
//@access Public
router.get("/:id", orderController.getOrderById);

//@desc   POST a order to db
//@route  POST /api/v1/order
//@access Admin, OrdersManager
router.post("/", orderController.addOrder);

//@desc   PUT(edit) a order from db
//@route  PUT(edit) /api/v1/order/:id
//@access Admin, OrdersManager
router.put("/:id", orderController.editOrder);

//@desc   DELETE a order by id from db
//@route  DELETE /api/v1/order/:id
//@access Admin
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
