const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const { signToken } = require("../../services/signToken");
const { createVerifyToken } = require("../../utils/createVerifyToken");

exports.register = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
  };

  const newUser = await User.create(newUserData);

  const verifyToken = await createVerifyToken(req, newUser);

  const token = signToken(newUser.id);

  newUser.verificationToken = verifyToken;
  newUser.token = token;

  await newUser.save();

  newUser.password = undefined;
  newUser.token = undefined;

  res.status(201).json({
    user: newUser,
    token,
  });
});