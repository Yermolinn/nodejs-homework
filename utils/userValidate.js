const Joi = require("joi");

exports.validateData = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().trim().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.number().integer().positive().required(),
    })
    .validate(data);