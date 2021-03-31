const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateCreateProductCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

const validateEditProductCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  validateCreateProductCategory,
  validateEditProductCategory,
};
