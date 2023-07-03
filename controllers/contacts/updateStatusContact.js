const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/contactModel");
const AppError = require("../../utils/appError");

exports.updateStatusContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean")
    return next(new AppError(400, "missing field favorite"));

  const newFavoriteStatus = await User.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    {
      new: true,
    }
  );

  res.status(200).json({
    contact: newFavoriteStatus,
  });
});