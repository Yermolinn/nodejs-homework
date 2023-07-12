const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

exports.logout = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  const user = await User.findByIdAndUpdate(_id, { token: null });

  if (!user) throw new AppError(401, "Not authorized");

  res.status(204).json();
});