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
}, {
    //add populated fields to json and object
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
// only id in populated recipes
// userSchema.pre("find", function () {
//   this.populate("recipes", "id -author");
// });
userSchema.virtual("recipes", {
    ref: "Recipe",
    localField: "_id",
    foreignField: "author",
});
userSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "author",
});
userSchema.pre("find", function () {
    this.populate("recipes").populate("reviews");
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
