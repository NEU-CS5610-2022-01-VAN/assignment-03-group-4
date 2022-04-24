import express, { Express } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";

//routers
import userRouter from "./routes/user.router";
import recipeRouter from "./routes/recipe.router";
import categoryRouter from "./routes/category.router";
import reviewRouter from "./routes/review.router";

//middlewares
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routers
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/categories", categoryRouter);
app.use("/reviews", reviewRouter);

async function connectDatabase() {
  const databaseUrl = <string>process.env.MONGO_URL;
  await mongoose.connect(databaseUrl, {});
  console.log("MongoDB connected.");
}

connectDatabase().catch((err) => console.log(err));

const port: number = Number(process.env.PORT) || 8000;

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
