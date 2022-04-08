"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeSchema = exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: "Category",
        },
    ],
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});
exports.recipeSchema = recipeSchema;
const Recipe = (0, mongoose_1.model)("Recipe", recipeSchema);
exports.Recipe = Recipe;
