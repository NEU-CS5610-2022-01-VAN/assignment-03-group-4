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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from "cors";
const mongoose_1 = require("mongoose");
const user_1 = require("./models/user");
const recipe_1 = require("./models/recipe");
const morgan_1 = __importDefault(require("morgan"));
const express_joi_validation_1 = require("express-joi-validation");
require("dotenv/config");
const app = (0, express_1.default)();
// app.use(cors());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
const validator = (0, express_joi_validation_1.createValidator)({});
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const databaseUrl = process.env.DATABASE_URL;
        yield (0, mongoose_1.connect)(databaseUrl, {});
        console.log("MongoDB connected");
    });
}
connectDatabase().catch((err) => console.log(err));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user_1.User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        });
        yield newUser.save();
        res.send(newUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
app.get("/users/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(req.params.userId);
        res.send(user);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
app.post("/users/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findByIdAndUpdate(req.params.userId, {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
        }, { new: true });
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.delete("/users/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findByIdAndDelete(req.params.userId);
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
//-------Recipe
app.post("/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRecipe = new recipe_1.Recipe({
            title: req.body.title,
            body: req.body.body,
            author: req.body.authorId,
        });
        yield newRecipe.save();
        res.send(newRecipe);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.get("/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.Recipe.find({});
        res.send(recipes);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
app.get("/recipes/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.Recipe.findById(req.params.recipeId);
        res.send(recipe);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
app.post("/recipes/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.Recipe.findByIdAndUpdate(req.params.recipeId, {
            title: req.body.title,
            body: req.body.body,
            author: req.body.authorId,
        }, { new: true });
        res.send(recipe);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.delete("/recipes/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipe_1.Recipe.findByIdAndDelete(req.params.recipeId);
        res.send(recipe);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
