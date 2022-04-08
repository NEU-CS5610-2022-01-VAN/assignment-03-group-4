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
const mongoose_1 = require("mongoose");
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
//routers
const user_1 = __importDefault(require("./routes/user"));
const recipe_1 = __importDefault(require("./routes/recipe"));
const category_1 = __importDefault(require("./routes/category"));
const review_1 = __importDefault(require("./routes/review"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
//routers
app.use("/users", user_1.default);
app.use("/recipes", recipe_1.default);
app.use("/categories", category_1.default);
app.use("/reviews", review_1.default);
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const databaseUrl = process.env.DATABASE_URL;
        yield (0, mongoose_1.connect)(databaseUrl, {});
        console.log("MongoDB connected");
    });
}
connectDatabase().catch((err) => console.log(err));
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
