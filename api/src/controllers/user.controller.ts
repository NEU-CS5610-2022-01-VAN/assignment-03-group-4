import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models/user";
import { Review } from "../models/review";
import { Recipe } from "../models/recipe";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.send(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .populate("recipes")
    .populate("reviews");
  res.send(user);
});

export const getReviewsByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const reviews = await Review.find({
      author: userId,
    }).populate({
      path: "author",
      model: User,
    });
    res.send(reviews);
  }
);

export const getRecipesByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const recipes = await Recipe.find({
      author: userId,
    })
      .populate("reviews")
      .populate("categories")
      .populate({
        path: "author",
        model: User,
      });

    res.send(recipes);
  }
);

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
  const _id = (req as any).user.sub;
  const email = (req as any).user[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = (req as any).user[`${process.env.AUTH0_AUDIENCE}/name`];
  const user = await User.findById(_id);
  if (user) {
    res.send(user);
  } else {
    const newUser = new User({
      _id,
      email,
      name,
    });
    await newUser.save();
    res.send(newUser);
  }
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { _id, email, name } = req.body;
  const newUser = new User({
    email,
    name,
    _id,
  });
  await newUser.save();
  res.send(newUser);
});

export const updateUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { email, name, password } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        email,
        password,
        name,
      },
      { new: true }
    );
    res.send(user);
  }
);

export const DeleteUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    res.send(user);
  }
);
