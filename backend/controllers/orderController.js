const OrderModel = require("../models/Order");
const {
  validateCreateOrder,
  validateEditOrder,
} = require("../shared/validator/OrderValidator");

const getOrders = async (req, res, next) => {
  try {
    OrderModel.find()
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

const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    OrderModel.findById(id)
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

const addOrder = (req, res, next) => {
  try {
    const { error } = validateCreateOrder(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const order = new OrderModel({
      productId: req.body.productId,
      quantity: req.body.quantity,
    });

    order
      .save()
      .then((result) => {
        res.status(201).json({
          message: "order created",
          createdOrder: result,
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

const editOrder = async (req, res, next) => {
  try {
    // TODO : something to do
  } catch (error) {
    // something to do
  }
};

const deleteOrder = (req, res, next) => {
  try {
    const id = req.params.id;
    OrderModel.remove({ _id: id })
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
  getOrders,
  getOrderById,
  addOrder,
  editOrder,
  deleteOrder,
};
