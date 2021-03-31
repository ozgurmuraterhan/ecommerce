const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateCreateOrder = (data) => {
  const schema = Joi.object({
    productId: Joi.objectId().required(),
    quantity: Joi.number().required(),
  });
  return schema.validate(data);
};

const validateEditOrder = (data) => {
  const schema = Joi.object({
    productId: Joi.objectId().required(),
    quantity: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = {
  validateCreateOrder,
  validateEditOrder,
};
