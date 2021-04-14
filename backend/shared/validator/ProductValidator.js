const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateCreateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().required(),
    isPublished: Joi.bool().required(),
    pictureUrl: Joi.string(),
    productCategoryId: Joi.objectId().required(),
  });
  return schema.validate(data);
};

const validateEditProduct = (data) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().required(),
    isPublished: Joi.bool().required(),
    pictureUrl: Joi.string(),
    productCategoryId: Joi.objectId().required(),
  });
  return schema.validate(data);
};

module.exports = {
  validateCreateProduct,
  validateEditProduct,
};
