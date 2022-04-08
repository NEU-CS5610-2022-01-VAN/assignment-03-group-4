"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    recipe: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
});
const Review = (0, mongoose_1.model)("Review", reviewSchema);
exports.Review = Review;
