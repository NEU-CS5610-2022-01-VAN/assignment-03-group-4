import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models/user";
import { Review } from "../models/review";
import { Recipe } from "../models/recipe";

export const getAllRecipes = asyncHandler(
  async (req: Request, res: Response) => {
    const recipes = await Recipe.find()
      .populate("author")
      .populate("reviews")
      .populate("categories");
    res.send(recipes);
  }
);

export const getRecipeById = asyncHandler(
  async (req: Request, res: Response) => {
    const recipe = await Recipe.findById(req.params.recipeId)
      .populate("author")
      .populate("reviews")
      .populate("categories");
    res.send(recipe);
  }
);

export const getReviewsByRecipeId = asyncHandler(
  async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId;
    const reviews = await Review.find({
      recipe: recipeId,
    }).populate({
      path: "author",
      model: User,
    });
    res.send(reviews);
  }
);

export const createRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, body, categories, ingredients, instructions } = req.body;
    const author = (req as any).user.sub;
    const newRecipe = new Recipe({
      title,
      body,
      author,
      categories,
      ingredients,
      instructions,
    });
    await newRecipe.save();
    res.send(newRecipe);
  }
);

export const updateRecipeById = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, body, author, categories, ingredients, instructions } =
      req.body;
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        title,
        body,
        author,
        categories,
        ingredients,
        instructions,
      },
      { new: true }
    );
    res.send(recipe);
  }
);

export const deleteRecipeById = asyncHandler(
  async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findByIdAndDelete(recipeId);
    res.send(recipe);
  }
);