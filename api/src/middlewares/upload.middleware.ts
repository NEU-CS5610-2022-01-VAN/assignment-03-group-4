const multer = require("multer");
import { GridFsStorage } from "multer-gridfs-storage";
import "dotenv/config";
const util = require("util");

const storage = new GridFsStorage({
  url: process.env.MONGO_URL || "",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req: any, file: any) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-recipe-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-recipe-${file.originalname}`,
      recipe: "testRecipeId",
    };
  },
});
var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
