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
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const newUser = new user_1.User({
            email,
            name,
            password,
        });
        yield newUser.save();
        res.send(newUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find({}).populate("recipes").exec();
        res.send(users);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
router.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_1.User.findById(userId).populate("recipes").exec();
        res.send(user);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
router.post("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { email, name, password } = req.body;
        const user = yield user_1.User.findByIdAndUpdate(userId, {
            email,
            password,
            name,
        }, { new: true });
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.deleteMany();
        res.send(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_1.User.findByIdAndDelete(userId);
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
