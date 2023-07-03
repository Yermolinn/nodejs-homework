const catchAsync = require("../../utils/catchAsync");

/** Get contact by Id */

exports.getContactById = catchAsync(async (req, res, next) => {
  const { contact } = req;

  res.status(200).json({
    contact,
  });
});