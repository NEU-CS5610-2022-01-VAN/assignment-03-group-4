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
const recipe_1 = require("../models/recipe");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, author, categories } = req.body;
        const newRecipe = new recipe_1.Recipe({
            title,
            body,
            author,
            categories,
        });
        yield newRecipe.save();
        yield user_1.User.findByIdAndUpdate(req.body.authorId, {
            $push: {
                recipes: newRecipe.id,
            },
        });
        res.send(newRecipe);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.Recipe.find({})
            .populate("author")
            .populate("categories")
            .exec();
        res.send(recipes);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
router.get("/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.Recipe.findById(req.params.recipeId)
            .populate("author")
            .populate("categories")
            .exec();
        res.send(recipe);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
router.post("/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, author, categories } = req.body;
    try {
        const recipe = yield recipe_1.Recipe.findByIdAndUpdate(req.params.recipeId, {
            title,
            body,
            author,
            categories,
        }, { new: true });
        res.send(recipe);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.Recipe.deleteMany();
        res.send(recipes);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete("/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.Recipe.findByIdAndDelete(req.params.recipeId);
        res.send(recipe);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
