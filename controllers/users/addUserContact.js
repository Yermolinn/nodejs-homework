const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/contactModel");

/** Add new contact by object - {name, email, phone} */

exports.addContact = catchAsync(async (req, res, next) => {
  const newContact = await User.create({
    favorite: false,
    ...req.body,
  });

  res.status(201).json({
    contact: newContact,
  });
});