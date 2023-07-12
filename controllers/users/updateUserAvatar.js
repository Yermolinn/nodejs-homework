const ImageService = require("../../services/imageService");
const catchAsync = require("../../utils/catchAsync");

exports.updateAvatar = catchAsync(async (req, res) => {
  const { file, user } = req;

  if (file) {
    user.avatarURL = await ImageService.save(file, "avatars", user.id);
  }

  user.password = undefined;
  user.token = undefined;

  res.status(200).json({
    user,
  });
});