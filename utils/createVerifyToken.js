const Email = require("../services/emailService");

exports.createVerifyToken = async (req, user) => {
  const uuid = require("uuid").v4;
  const verifyToken = uuid();

  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/verify/${verifyToken}`;

  try {
    await new Email(user, url).sendHello();
  } catch (err) {
    console.log(err);
  }

  return verifyToken;
};