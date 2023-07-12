const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const { registerValidateData } = require("../../utils/userValidate");
const User = require("../../models/userModel");

/**
 * Validates data User middleware
 */
exports.checkRegisterUserData = catchAsync(async (req, res, next) => {
  const { error, value } = registerValidateData(req.body);

  if (error) throw new AppError(400, "Invalid user data");

  const existContact = await User.exists({
    email: value.email,
  });

  if (existContact)
    throw new AppError(400, "User with this email already exists");

  req.body = value;

  next();
});