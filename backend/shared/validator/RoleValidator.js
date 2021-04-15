const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateCreateRole = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
};

const validateEditRole = (data) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  validateCreateRole,
  validateEditRole,
};
