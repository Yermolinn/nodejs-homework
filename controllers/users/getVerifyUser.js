const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const User = require("../../models/userModel");

exports.getVerifyUser = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw new AppError(404, "User not found");

  user.verificationToken = null;
  user.verify = true;

  await user.save();

  res.status(200).json({
    message: "Verification successful",
  });
});