const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { createVerifyToken } = require("../../utils/createVerifyToken");
const { emailValidate } = require("../../utils/userValidate");

exports.repeatSendingVerifyUser = catchAsync(async (req, res) => {
  const { value } = emailValidate(req.body);
  const { email } = value;

  if (!email) throw new AppError(400, "Missing required field email");

  const user = await User.findOne({ email });

  if (user.verify)
    throw new AppError(400, "Verification has already been passed");

  const verifyToken = await createVerifyToken(req, user);
  user.verificationToken = verifyToken;

  await user.save();

  res.status(200).json({ message: "Verification email sent" });
});