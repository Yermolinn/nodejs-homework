const {
  checkRegisterUserData,
} = require("../../middlewares/auth/chechRegisterUserData");
const { protect } = require("../../middlewares/auth/protect");

module.exports = {
  checkRegisterUserData,
  protect,
};