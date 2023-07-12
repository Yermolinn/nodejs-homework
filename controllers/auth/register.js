const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const { signToken } = require("../../services/signToken");

exports.register = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
  };

  const newUser = await User.create(newUserData);

  const token = signToken(newUser.id);
  await User.findByIdAndUpdate(newUser._id, { token: token });

  newUser.password = undefined;
  newUser.token = undefined;

  res.status(201).json({
    user: newUser,
    token,
  });
});