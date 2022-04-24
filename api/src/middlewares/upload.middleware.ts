import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import "dotenv/config";
import util from "util";
import { Request } from "express";

const storage = new GridFsStorage({
  url: process.env.MONGO_URL || "",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req: Request, file: any) => {
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
const uploadFiles = multer({ storage: storage }).single("file");
const uploadFilesMiddleware = util.promisify(uploadFiles);

export { uploadFilesMiddleware };
