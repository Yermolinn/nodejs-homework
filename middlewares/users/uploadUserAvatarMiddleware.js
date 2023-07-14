const ImageService = require("../../services/imageService");

exports.uploadUserAvatarMiddleware = ImageService.upload("avatar");