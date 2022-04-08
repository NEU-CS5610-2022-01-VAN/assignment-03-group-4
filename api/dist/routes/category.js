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
const category_1 = require("../models/category");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = new category_1.Category({
            name: req.body.name,
        });
        yield newCategory.save();
        res.send(newCategory);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.find();
        res.send(categories);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
router.get("/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.Category.findById(req.params.categoryId);
        res.send(category);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}));
router.post("/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.Category.findByIdAndUpdate(req.params.categoryId, {
            name: req.body.name,
        }, { new: true });
        res.send(category);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.deleteMany();
        res.send(categories);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete("/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.Category.findByIdAndDelete(req.params.categoryId);
        res.send(category);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
