const catchAsync = require("../../utils/catchAsync");
const Contact = require("../../models/contactModel");
const AppError = require("../../utils/appError");

const { registerValidateData } = require("../../utils/userValidate");

/**
 * Validates data User middleware
 */
exports.checkRegisterUserData = catchAsync(async (req, res, next) => {
  const { error, value } = registerValidateData(req.body);

  if (error) throw new AppError(400, "Invalid user data");

  const existContact = await Contact.exists({
    email: value.email,
  });

  if (existContact)
    throw new AppError(400, "User with this email already exists");

  req.body = value;

  next();
});