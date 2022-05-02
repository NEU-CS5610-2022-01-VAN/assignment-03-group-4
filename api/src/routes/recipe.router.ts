import { Router } from "express";
import { checkJwt } from "../middlewares/check-jwt.middleware";
import * as recipeController from "../controllers/recipe.controller";
import * as uploadController from "../controllers/upload.controller";

const router = Router();

router.get("/:recipeId/files/:fileId", uploadController.download);
router.get("/", recipeController.getAllRecipes);
router.get("/:recipeId", recipeController.getRecipeById);
router.get("/:recipeId/reviews", recipeController.getReviewsByRecipeId);
router.post(
  "/:recipeId/files",
  checkJwt,
  uploadController.uploadFilesByRecipeId
);
router.post("/", checkJwt, recipeController.createRecipe);
router.post("/:recipeId", checkJwt, recipeController.updateRecipeById);
router.delete("/:recipeId", checkJwt, recipeController.deleteRecipeById);

export default router;
