const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateCreateProduct = (data) => {
  const schema = Joi.object({
    // categoryId: Joi.objectId().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().required(),
    pictureUrl: Joi.string(),
  });
  return schema.validate(data);
};

const validateEditProduct = (data) => {
  const schema = Joi.object({
    // categoryId: Joi.objectId().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().required(),
    pictureUrl: Joi.string(),
  });
  return schema.validate(data);
};

module.exports = {
  validateCreateProduct,
  validateEditProduct,
};
