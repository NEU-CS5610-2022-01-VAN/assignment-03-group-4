import { Router, Request, Response } from "express";
import { Review } from "../models/review";
import { checkJwt } from "../middlewares/check-jwt.middleware";
import { User } from "../models/user";
import { Recipe } from "../models/recipe";

const router = Router();

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

    await updateRecipeRating(recipe);

    res.send(newReview);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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

    await updateRecipeRating((review as any).recipe);

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

    await updateRecipeRating((review as any).recipe);

    res.send(review);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
