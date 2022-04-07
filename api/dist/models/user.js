"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    recipes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
