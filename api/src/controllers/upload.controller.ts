import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import { Recipe } from "../models/recipe";
import "dotenv/config";

const upload = require("../middlewares/upload.middleware");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const mongoClient = new MongoClient(process.env.MONGO_URL || "");

export const uploadFilesByRecipeId = asyncHandler(
  async (req: any, res: any) => {
    const recipeId = req.params.recipeId;
    await upload(req, res);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    await Recipe.findByIdAndUpdate(recipeId, {
      $push: {
        photos: req.file.id,
      },
    });
    return res.send({
      message: "File has been uploaded.",
    });
  }
);

export const download = asyncHandler(async (req: any, res: any) => {
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
});
