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
        const user = yield user_1.User.findById(req.params.userId);
        res.send(user);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
router.post("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.delete("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findByIdAndDelete(req.params.userId);
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
