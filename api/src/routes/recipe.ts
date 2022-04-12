import { Router, Request, Response } from "express";
import { Recipe } from "../models/recipe";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, body, author, categories } = req.body;

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

router.get("/", async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();

    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/:recipeId", async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    res.send(recipe);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

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
