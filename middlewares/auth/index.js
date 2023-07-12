const {
  checkRegisterUserData,
} = require("../../middlewares/auth/checkRegisterUserData");
const { protect } = require("../../middlewares/auth/protect");

module.exports = {
  checkRegisterUserData,
  protect,
};