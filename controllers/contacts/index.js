const { addContact } = require("./addContacts");
const { listContacts } = require("./getAllContacts");
const { getContactById } = require("./getContact");
const { removeContact } = require("./removeContact");
const { updateContact } = require("./updateContact");
const { updateStatusContact } = require("./updateStatusContact");

module.exports = {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
};