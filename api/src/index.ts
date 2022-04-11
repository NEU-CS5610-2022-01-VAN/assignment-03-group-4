import express, { Express, Request, Response } from "express";
import Joi from "joi";
import { connect } from "mongoose";

import morgan from "morgan";
import { createValidator } from "express-joi-validation";
import "dotenv/config";
import cors from "cors";

//routers
import userRouter from "./routes/user.router";
import recipeRouter from "./routes/recipe.router";
import categoryRouter from "./routes/category.router";
import reviewRouter from "./routes/review.router";

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// app.use((req, res, next) => {
//   console.log(req);
//   next();
// });

//routers
app.use("/users", userRouter);

app.use("/recipes", recipeRouter);
app.use("/categories", categoryRouter);
app.use("/reviews", reviewRouter);

async function connectDatabase() {
  const databaseUrl: string = <string>process.env.MONGO_URL;
  await connect(databaseUrl, {});
  console.log("MongoDB connected oh yeah!");
}

connectDatabase().catch((err) => console.log(err));

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
