import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models/user";
import { IReview, Review } from "../models/review";
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
    const review: IReview | null = await Review.findByIdAndUpdate(
      reviewId,
      { title, content, rating, recipe, author },
      { new: true }
    );
    if (review) {
      await updateRecipeRating(review.recipe);
    }
    res.send(review);
  }
);

export const deleteReviewById = asyncHandler(
  async (req: Request, res: Response) => {
    const reviewId = req.params.reviewId;
    const review: IReview | null = await Review.findById(reviewId);
    if (!review) {
      res.status(404).send({ message: "Review not found" });
      return;
    }
    if ((req as any).user.sub != review.author) {
      res
        .status(401)
        .send({ message: "You have no permission to delete this review" });
      return;
    }
    await Review.findByIdAndDelete(reviewId);
    await updateRecipeRating(review.recipe);
    res.send(review);
  }
);

// update a recipe's rating by its reviews
const updateRecipeRating = async (recipeId: any) => {
  const reveiws: IReview[] = await Review.find({ recipe: recipeId });

  // set recipe's rating to undefined if it has no review
  if (reveiws.length === 0) {
    await Recipe.findByIdAndUpdate(recipeId, { $unset: { rating: 1 } });
  } else {
    const sumRating: number = reveiws.reduce(
      (prev, curReivew) => prev + curReivew.rating,
      0
    );
    const newRating: number = sumRating / reveiws.length;
    await Recipe.findByIdAndUpdate(recipeId, {
      rating: newRating,
    });
  }
};
