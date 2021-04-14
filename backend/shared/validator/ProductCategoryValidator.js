const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateCreateProductCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    pictureUrl: Joi.string(),
    isPublished: Joi.bool().required(),
  });
  return schema.validate(data);
};

const validateEditProductCategory = (data) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    pictureUrl: Joi.string(),
    isPublished: Joi.bool().required(),
  });
  return schema.validate(data);
};

module.exports = {
  validateCreateProductCategory,
  validateEditProductCategory,
};
