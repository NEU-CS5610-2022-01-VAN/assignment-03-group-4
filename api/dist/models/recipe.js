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
}, {
    //add populated fields to json and object
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
exports.recipeSchema = recipeSchema;
recipeSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "recipe",
});
recipeSchema.pre("find", function () {
    this.populate("reviews");
});
const Recipe = (0, mongoose_1.model)("Recipe", recipeSchema);
exports.Recipe = Recipe;
