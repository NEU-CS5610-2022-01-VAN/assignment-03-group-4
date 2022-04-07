import express, { Express, Request, Response } from "express";
import Joi from "joi";
// import cors from "cors";
import {
  Schema,
  model,
  connect,
  Types,
  HydratedDocument,
  Document,
} from "mongoose";
import { User } from "./models/user";
import { Recipe } from "./models/recipe";
import morgan from "morgan";
import { createValidator } from "express-joi-validation";
import "dotenv/config";

const app: Express = express();

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

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

app.post("/users", async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

app.get("/users/:userId", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

app.post("/users/:userId", async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      },
      { new: true }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//-------Recipe

app.post("/recipes", async (req: Request, res: Response) => {
  try {
    const newRecipe = new Recipe({
      title: req.body.title,
      body: req.body.body,
      author: req.body.authorId,
    });
    await newRecipe.save();
    res.send(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/recipes", async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find({});
    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

app.get("/recipes/:recipeId", async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.send(recipe);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

app.post("/recipes/:recipeId", async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      {
        title: req.body.title,
        body: req.body.body,
        author: req.body.authorId,
      },
      { new: true }
    );
    res.send(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.delete("/recipes/:recipeId", async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    res.send(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
