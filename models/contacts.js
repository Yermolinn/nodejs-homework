const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid")

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { validateData } = require("../utils/userValidate");

const dbPath = path.join("models", "contacts.json");

/** Get all contacts */

const listContacts = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await readFile(dbPath));

  res.status(200).json({
    contacts,
  });
});

/**
 * Get contact by Id
 *
 */

const getContactById = catchAsync(async (req, res, next) => {
  const allContacts = JSON.parse(await readFile(dbPath));

  const contact = allContacts.find((elem) => elem.id === req.params.contactId);

  if (!contact) return next(new AppError(404, "Not found"));

  res.status(200).json({
    contact,
  });
});

/** Add new contact by object - {name, email, phone} */

const addContact = catchAsync(async (req, res, next) => {
  const { error, value } = validateData(req.body);

  if (error) return next(new AppError(400, "missing required name field"));

  const contacts = JSON.parse(await readFile(dbPath));

  const newContact = {
    id: nanoid(),
    ...value,
  };

  contacts.push(newContact);
  await writeFile(dbPath, JSON.stringify(contacts));

  res.status(201).json({
    contact: newContact,
  });
});

/** Remove contact by Id */

const removeContact = catchAsync(async (req, res, next) => {
  const allContacts = JSON.parse(await readFile(dbPath));

  const removedContact = allContacts.find(
    (elem) => elem.id === req.params.contactId
  );

  const indexRemovedContact = allContacts.indexOf(removedContact);

  if (indexRemovedContact === -1) {
    return next(new AppError(404, "Not found"));
  }

  allContacts.splice(indexRemovedContact, 1);
  await writeFile(dbPath, JSON.stringify(allContacts));

  res.status(200).json({
    message: "contact deleted",
  });
});

/** Update contact by Id and body as {name, phone, email} */

const updateContact = catchAsync(async (req, res, next) => {
  const contacts = JSON.parse(await readFile(dbPath));

  const contactId = req.params.contactId;
  const { value, error } = validateData(req.body);

  if (error) return next(new AppError(400, "missing fields"));

  const newContact = {
    id: contactId,
    ...value,
  };

  const oldContact = contacts.find((elem) => elem.id === contactId);

  const indexPrevContact = contacts.indexOf(oldContact);

  contacts.splice(indexPrevContact, 1, newContact);

  await writeFile(dbPath, JSON.stringify(contacts));

  res.status(200).json({
    contact: newContact,
  });
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};