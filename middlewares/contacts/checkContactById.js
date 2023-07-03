const { Types } = require("mongoose");

const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/contactModel");
const AppError = require("../../utils/appError");

/** Validates id and checks if the user data exists */
exports.checkContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const isIdValid = Types.ObjectId.isValid(contactId);

  if (!isIdValid) return next(new AppError(400, "Bad request"));

  const contact = await User.findById(contactId);

  if (!contact) return next(new AppError(404, "Not found"));

  req.contact = contact;

  next();
});