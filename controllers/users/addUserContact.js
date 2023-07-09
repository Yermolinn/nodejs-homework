const catchAsync = require("../../utils/catchAsync");
const Contact = require("../../models/contactModel");

/** Add new contact by object - {name, email, phone} */
exports.addContact = catchAsync(async (req, res, next) => {
  const newContactData = await Contact.create({
    owner: req.user,
    favorite: false,
    ...req.body,
  });

  const newContact = await Contact.create(newContactData);

  res.status(201).json({
    contact: newContact,
  });
});