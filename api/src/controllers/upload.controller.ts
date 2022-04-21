import mongoose from "mongoose";
import { Recipe } from "../models/recipe";

const upload = require("../middlewares/upload.middleware");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
import "dotenv/config";

const mongoClient = new MongoClient(process.env.MONGO_URL || "");

const uploadFiles = async (req: any, res: any) => {
  try {
    await upload(req, res);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }

    const recipeId = req.params.recipeId;
    await Recipe.findByIdAndUpdate(recipeId, {
      $push: {
        photos: req.file.id,
      },
    });

    return res.send({
      message: "File has been uploaded.",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};

const download = async (req: any, res: any) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("recipeDB");
    const bucket = new GridFSBucket(database, {
      bucketName: "photos",
    });
    let downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.fileId)
    );

    downloadStream.on("data", function (data: any) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err: any) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = {
  uploadFiles,
  download,
};
