import express, { Express, Request, Response } from "express";
import Joi from "joi";
// import cors from "cors";
import { connect } from "mongoose";

import morgan from "morgan";
import { createValidator } from "express-joi-validation";
import "dotenv/config";

import userRouter from "./routes/user";
import recipeRouter from "./routes/recipe";

const app: Express = express();

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

//routers
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);

const validator = createValidator({});

async function connectDatabase() {
  const databaseUrl: string = <string>process.env.DATABASE_URL;
  await connect(databaseUrl, {});
  console.log("MongoDB connected");
}

connectDatabase().catch((err) => console.log(err));

interface ICategory {
  name: string;
}

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
