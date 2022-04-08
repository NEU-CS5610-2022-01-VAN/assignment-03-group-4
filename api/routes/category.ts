import { Router, Request, Response } from "express";
import { Category } from "../models/category";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
    });
    await newCategory.save();
    res.send(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/:categoryId", async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.send(category);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.post("/:categoryId", async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        name: req.body.name,
      },
      { new: true }
    );
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const categories = await Category.deleteMany();
    res.send(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:categoryId", async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
