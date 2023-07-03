const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/contactModel");
const AppError = require("../../utils/appError");

const { validateData } = require("../../utils/userValidate");

/** Validates data User middleware */
exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = validateData(req.body);

  if (error) return next(new AppError(400, "Invalid user data"));

  const existUser = await User.exists({
    email: value.email,
  });

  if (existUser)
    return next(new AppError(400, "User with this email already exists"));

  req.body = value;

  next();
});