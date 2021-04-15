const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateCreateUser = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.number(),
    isActive: Joi.bool().required(),
    avatar: Joi.string(),
  });
  return schema.validate(data);
};

const validateEditUser = (data) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.number(),
    isActive: Joi.bool().required(),
    avatar: Joi.string(),
  });
  return schema.validate(data);
};

const validateLoginUser = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  validateCreateUser,
  validateEditUser,
  validateLoginUser,
};
