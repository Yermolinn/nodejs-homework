const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/contactModel");

/** Get all contacts */

exports.listContacts = catchAsync(async (req, res) => {
  const contacts = await User.find();

  res.status(200).json({
    contacts,
  });
});