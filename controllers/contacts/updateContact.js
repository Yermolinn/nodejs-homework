const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/contactModel");

/** Update contact by Id and body as {name, phone, email} */

exports.updateContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const newContact = await User.findByIdAndUpdate(
    contactId,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    contact: newContact,
  });
});