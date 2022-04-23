import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Category } from "../models/category";
import { Recipe } from "../models/recipe";

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.send(categories);
  }
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    res.send(category);
  }
);

export const getRecipesByCategoryId = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const recipes = await Recipe.find({
      categories: categoryId,
    })
      .populate("author")
      .populate("reviews")
      .populate("categories");
    res.send(recipes);
  }
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const newCategory = new Category({
      name,
    });
    await newCategory.save();
    res.send(newCategory);
  }
);

export const updateCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
      },
      { new: true }
    );
    res.send(category);
  }
);
export const deleteCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const category = await Category.findByIdAndDelete(categoryId);
    res.send(category);
  }
);
