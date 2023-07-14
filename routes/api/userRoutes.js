const { Router } = require("express");

const { protect } = require("../../middlewares/auth");
const {
  addContact,
  listContacts,
  getMe,
  updateStatusUser,
  updateAvatar,
} = require("../../controllers/users");
const { uploadUserAvatarMiddleware } = require("../../middlewares/users");

const router = Router();

router.use(protect);

router.post("/", addContact);
router.get("/", listContacts);

router.get("/current", getMe);

router.patch("/avatars", uploadUserAvatarMiddleware, updateAvatar);

router.patch("/:userId", updateStatusUser);

module.exports = router;