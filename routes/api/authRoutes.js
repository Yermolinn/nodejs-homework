const { Router } = require("express");
const authController = require("../../controllers/auth");
const authMiddleware = require("../../middlewares/auth");

const router = Router();

router.post(
  "/users/register",
  authMiddleware.checkRegisterUserData,
  authController.register
);
router.post("/users/login", authController.login);
router.post("/users/logout", authController.logout);

module.exports = router;