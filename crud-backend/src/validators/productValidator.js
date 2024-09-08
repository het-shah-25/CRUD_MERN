const Joi = require("joi");

exports.validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().optional(),
    category: Joi.string().min(3).max(50).required().optional(),
    qty: Joi.number().integer().min(1).required().optional(),
    price: Joi.number().min(1).required().optional(),
    img: Joi.string().uri().optional(),
  });

  return schema.validate(data);
};
