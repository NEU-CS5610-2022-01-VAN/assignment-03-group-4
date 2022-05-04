import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { MongoClient, GridFSBucket } from "mongodb";
import "dotenv/config";
import { Recipe } from "../models/recipe";
import { uploadFilesMiddleware } from "../middlewares/upload.middleware";
import { IUser, User } from "../models/user";

const mongoClient = new MongoClient(process.env.MONGO_URL || "");

export const uploadFilesByRecipeId = asyncHandler(
  async (req: any, res: any) => {
    const recipeId = req.params.recipeId;
    await uploadFilesMiddleware(req, res);
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

export const uploadPictureByUserId = asyncHandler(
  async (req: any, res: any) => {
    const userId = (req as any).user.sub;
    await uploadFilesMiddleware(req, res);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    await User.findByIdAndUpdate(userId, {
      picture: req.file.id,
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

export const downloadPictureByUserId = asyncHandler(
  async (req: any, res: any) => {
    await mongoClient.connect();
    const database = mongoClient.db("recipeDB");
    const bucket = new GridFSBucket(database, {
      bucketName: "photos",
    });
    const user: IUser | null = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }

    let downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(user.picture)
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
  }
);
