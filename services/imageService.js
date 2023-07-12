const multer = require("multer");
const jimp = require("jimp");
const path = require("path");
const uuid = require("uuid").v4;

const fs = require("fs/promises");
const fse = require("fs-extra");

const AppError = require("../utils/appError");

const tempDir = path.join(__dirname, "../", "tmp").replace(/\\/g, "/");

class ImageService {
  static upload(name) {
    // const multerStorage = multer.memoryStorage();

    const multerStorage = multer.diskStorage({
      destination: tempDir,
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new AppError(400, "Upload images only!"), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, ...pathSegments) {
    const fileName = `${uuid()}_${file.originalname.split(".")[0]}.jpeg`;
    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

    await fse.ensureDir(fullFilePath);

    await jimp.read(file.path).then((avatar) => {
      return avatar
        .resize(250, 250)
        .write(`${path.join(fullFilePath, fileName)}`);
    });

    return path.join(...pathSegments, fileName).replace(/\\/g, "/");
  }
}

module.exports = ImageService;