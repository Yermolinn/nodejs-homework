const { Router } = require("express");
const authController = require("../../controllers/auth");
const authMiddleware = require("../../middlewares/auth");
const {
  getVerifyUser,
  repeatSendingVerifyUser,
} = require("../../controllers/users");

const router = Router();

router.post(
  "/users/register",
  authMiddleware.checkRegisterUserData,
  authController.register
);
router.post("/users/login", authController.login);
router.post("/users/logout", authController.logout);

router.get("/verify/:verificationToken", getVerifyUser);
router.post("/users/verify", repeatSendingVerifyUser);

module.exports = router;