import { Router } from "express";
import { checkJwt } from "../middlewares/check-jwt.middleware";
import * as userController from "../controllers/user.controller";
const guard = require("express-jwt-permissions")();

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.get("/:userId/reviews", userController.getReviewsByUserId);
router.get("/:userId/recipes", userController.getRecipesByUserId);
router.post("/verify-user", checkJwt, userController.verifyUser);
router.post("/", checkJwt, userController.createUser);
router.post("/:userId", checkJwt, userController.updateUserById);
router.delete("/:userId", checkJwt, userController.DeleteUserById);

export default router;
