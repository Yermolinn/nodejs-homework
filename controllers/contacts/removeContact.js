const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/contactModel");

/** Remove contact by Id */

exports.removeContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  await User.findByIdAndDelete(contactId);

  res.status(200).json({
    message: "contact deleted",
  });
});