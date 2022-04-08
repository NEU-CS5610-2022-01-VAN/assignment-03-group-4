"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    // recipes: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Recipe",
    //   },
    // ],
});
exports.categorySchema = categorySchema;
const Category = (0, mongoose_1.model)("Category", categorySchema);
exports.Category = Category;
