import { Router } from "express";
import { checkJwt } from "../middlewares/check-jwt.middleware";
import * as categoryController from "../controllers/category.controller";

const router = Router();

router.get("/", categoryController.getAllCategories);
router.get("/:categoryId", categoryController.getCategoryById);
router.get("/:categoryId/recipes", categoryController.getRecipesByCategoryId);
router.post("/", checkJwt, categoryController.createCategory);
router.post("/:categoryId", checkJwt, categoryController.updateCategoryById);
router.delete("/:categoryId", checkJwt, categoryController.deleteCategoryById);

export default router;
