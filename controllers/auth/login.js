const User = require("../../models/userModel");
const { signToken } = require("../../services/signToken");
const AppError = require("../../utils/appError");

const catchAsync = require("../../utils/catchAsync");

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new AppError(401, "Email or password is wrong");
  user.token = undefined;

  const isValidPassword = await user.checkPassword(password, user.password);

  if (!isValidPassword) throw new AppError(401, "Email or password is wrong");

  user.password = undefined;

  const token = signToken(user.id);

  res.status(200).json({
    user,
    token,
  });
});