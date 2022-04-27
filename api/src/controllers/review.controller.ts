import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models/user";
import { Review } from "../models/review";
import { Recipe } from "../models/recipe";

export const getAllReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const reviews = await Review.find().sort({ createdAt: -1 }).populate({
      path: "author",
      model: User,
    });
    res.send(reviews);
  }
);

export const getReviewById = asyncHandler(
  async (req: Request, res: Response) => {
    const reviewId = req.params.reviewId;
    const user = await Review.findById(reviewId);
    res.send(user);
  }
);

export const createReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, content, rating, recipe } = req.body;
    const author = (req as any).user.sub;
    const newReview = new Review({ title, content, rating, recipe, author });
    await newReview.save();
    await updateRecipeRating(recipe);
    res.send(newReview);
  }
);

export const updateReviewById = asyncHandler(
  async (req: Request, res: Response) => {
    const reviewId = req.params.reviewId;
    const { title, content, rating, recipe, author } = req.body;
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { title, content, rating, recipe, author },
      { new: true }
    );
    await updateRecipeRating((review as any).recipe);
    res.send(review);
  }
);

export const deleteReviewById = asyncHandler(
  async (req: Request, res: Response) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByIdAndDelete(reviewId);
    await updateRecipeRating((review as any).recipe);
    res.send(review);
  }
);

// update a recipe's rating by its reviews
const updateRecipeRating = async (recipeId: any) => {
  const reveiws = await Review.find({ recipe: recipeId });
  if (!reveiws) {
    await Recipe.findByIdAndUpdate(recipeId, { rating: 0 });
  } else {
    const sumRating = reveiws.reduce(
      (prev, curReivew) => prev + curReivew.rating,
      0
    );
    const newRating = sumRating / reveiws.length;
    await Recipe.findByIdAndUpdate(recipeId, {
      rating: newRating,
    });
  }
};
