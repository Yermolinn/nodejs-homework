const User = require("../../models/userModel");
// const { signToken } = require("../../services/signToken");
const AppError = require("../../utils/appError");

const catchAsync = require("../../utils/catchAsync");
const { userSignInHandler } = require("../../utils/userSignInHandler");

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(401, "Email or password is wrong");
  }

  const isValidPassword = await user.checkPassword(password, user.password);

  if (!isValidPassword) throw new AppError(401, "Email or password is wrong");

  if (!user.verify) {
    throw new AppError(401, "User is not verify!");
  }

  const resDataUser = userSignInHandler(user);

  res.status(200).json({
    ...resDataUser,
  });
});