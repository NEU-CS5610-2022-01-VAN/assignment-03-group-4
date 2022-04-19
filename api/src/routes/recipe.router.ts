import { Router, Request, Response } from "express";
import { Recipe } from "../models/recipe";
import { checkJwt } from "../middlewares/check-jwt.middleware";
import { Review } from "../models/review";
import { User } from "../models/user";

const uploadController = require("../controllers/upload.controller");

const router = Router();

router.post("/:recipeId/upload", checkJwt, uploadController.uploadFiles);
// router.get("/:recipeId/files", uploadController.getListFiles);
router.get("/:recipeId/files/:fileId", uploadController.download);

router.get("/", async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find()
      .populate("author")
      .populate("reviews")
      .populate("categories");

    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/:recipeId", async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
      .populate("author")
      .populate("reviews")
      .populate("categories");

    res.send(recipe);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/:recipeId/reviews", async (req: Request, res: Response) => {
  try {
    const recipeId = req.params.recipeId;

    const reviews = await Review.find({
      recipe: recipeId,
    }).populate({
      path: "author",
      model: User,
    });

    res.send(reviews);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.post("/image", async (req: Request, res: Response) => {
  console.log("in the recipe router");
  try {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8000/file/${req.file.filename}`;
    return res.send(imgUrl);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/", checkJwt, async (req: Request, res: Response) => {
  try {
    const { title, body, categories } = req.body;

    const author = (req as any).user.sub;

    const newRecipe = new Recipe({
      title,
      body,
      author,
      categories,
    });
    await newRecipe.save();

    res.send(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.use(checkJwt);

router.post("/:recipeId", async (req: Request, res: Response) => {
  const { title, body, author, categories } = req.body;

  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      {
        title,
        body,
        author,
        categories,
      },
      { new: true }
    );

    res.send(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.deleteMany();

    res.send(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:recipeId", async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);

    res.send(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
