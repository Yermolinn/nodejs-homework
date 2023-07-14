const Joi = require("joi");
const regexPhoneNumber = /^\(\d{3}\)\d{3}-\d{4}$/;
const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.validateData = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().trim().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().regex(regexPhoneNumber).required(),
      favorite: Joi.boolean(),
    })
    .validate(data);

exports.registerValidateData = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      subscription: Joi.string().valid("starter", "pro", "business"),
      token: Joi.string(),
      avatarURL: Joi.string(),
      verify: Joi.boolean().default(false),
      verificationToken: Joi.string(),
    })
    .validate(data);

exports.emailValidate = (email) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
    })
    .validate(email);