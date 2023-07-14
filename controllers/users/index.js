const { addContact } = require("./addUserContact");
const { getMe } = require("./getMe");
const { listContacts } = require("./listUserContacts");
const { updateStatusUser } = require("./updateUserSubscription");
const { updateAvatar } = require("./updateUserAvatar");
const { getVerifyUser } = require("./getVerifyUser");
const { repeatSendingVerifyUser } = require("./repeatSendingVerifyUser");

module.exports = {
  addContact,
  getMe,
  listContacts,
  updateStatusUser,
  updateAvatar,
  getVerifyUser,
  repeatSendingVerifyUser,
};