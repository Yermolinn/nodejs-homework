const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getMe } = require("../users/getMe");

module.exports = {
  register,
  login,
  logout,
  getMe,
};