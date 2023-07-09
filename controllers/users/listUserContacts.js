const catchAsync = require("../../utils/catchAsync");
const Contact = require("../../models/contactModel");

/** Get all contacts */
exports.listContacts = catchAsync(async (req, res) => {
  const { page, limit, favorite } = req.query;

  let findOptions = {};

  if (favorite === "true") {
    findOptions = { favorite: true };
  } else if (favorite === "false") {
    findOptions = { favorite: false };
  }

  const contactsQuery = Contact.find(findOptions);

  // Pagination

  const paginationPage = +page || 1;
  const paginationLimit = +limit || 5;
  const skip = (paginationPage - 1) * paginationLimit;

  contactsQuery.skip(skip).limit(paginationLimit);

  const contacts = await contactsQuery;

  res.status(200).json({
    contacts,
  });
});