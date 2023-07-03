const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/contactModel");
const AppError = require("../../utils/appError");
const { validateData } = require("../../utils/userValidate");

exports.checkUpdateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = validateData(req.body);

  if (error) return next(new AppError(400, "Invalid user data"));

  const { id } = req.contact;

  const existUser = await User.findOne({ email: value.email });

  if (existUser && existUser.id !== id)
    return next(new AppError(400, "User with this email already exists"));

  req.body = value;

  next();
});