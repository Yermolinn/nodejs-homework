const { Router } = require("express");

const { protect } = require("../../middlewares/auth");
const {
  addContact,
  listContacts,
  getMe,
  updateStatusUser,
} = require("../../controllers/users");

const router = Router();

router.use(protect);

router.post("/", addContact);
router.get("/", listContacts);

router.get("/current", getMe);

router.patch("/:userId", updateStatusUser);

module.exports = router;