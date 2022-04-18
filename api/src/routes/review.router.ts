import { Router, Request, Response } from "express";
import { Review } from "../models/review";
import { checkJwt } from "../middlewares/check-jwt.middleware";
import { User } from "../models/user";
import { Recipe } from "../models/recipe";

const router = Router();

router.post("/", checkJwt, async (req: Request, res: Response) => {
  try {
    const { content, rating, recipe, author } = req.body;

    const newReview = new Review({
      content,
      rating,
      recipe,
      author,
    });
    await newReview.save();

    // const recipeToUpdate =await Recipe.findById(recipe);
    // const newRating = recipeToUpdate.reviews?
    res.send(newReview);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate({
      path: "author",
      model: User,
    });

    res.send(reviews);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/:reviewId", async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId;

    const user = await Review.findById(reviewId);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.post("/:reviewId", checkJwt, async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId;
    const { content, rating, recipe, author } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      {
        content,
        rating,
        recipe,
        author,
      },
      { new: true }
    );

    res.send(review);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/", checkJwt, async (req: Request, res: Response) => {
  try {
    const reviews = await Review.deleteMany();

    res.send(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:reviewId", checkJwt, async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId;

    const review = await Review.findByIdAndDelete(reviewId);
    res.send(review);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
