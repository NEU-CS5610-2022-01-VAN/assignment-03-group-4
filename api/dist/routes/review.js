"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_1 = require("../models/review");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, rating, recipe, author } = req.body;
        const newReview = new review_1.Review({
            content,
            rating,
            recipe,
            author,
        });
        yield newReview.save();
        res.send(newReview);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_1.Review.find();
        res.send(reviews);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
router.get("/:reviewId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.reviewId;
        const user = yield review_1.Review.findById(reviewId);
        res.send(user);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
router.post("/:reviewId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.reviewId;
        const { content, rating, recipe, author } = req.body;
        const review = yield review_1.Review.findByIdAndUpdate(reviewId, {
            content,
            rating,
            recipe,
            author,
        }, { new: true });
        res.send(review);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_1.Review.deleteMany();
        res.send(reviews);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete("/:reviewId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.reviewId;
        const review = yield review_1.Review.findByIdAndDelete(reviewId);
        res.send(review);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
