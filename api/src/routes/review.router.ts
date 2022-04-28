import { Router } from "express";
import { checkJwt } from "../middlewares/check-jwt.middleware";
import * as reviewController from "../controllers/review.controller";

const router = Router();

router.get("/", reviewController.getAllReviews);
router.get("/:reviewId", reviewController.getReviewById);
router.post("/", checkJwt, reviewController.createReview);
router.post("/:reviewId", checkJwt, reviewController.updateReviewById);
router.delete("/:reviewId", checkJwt, reviewController.deleteReviewById);

export default router;
