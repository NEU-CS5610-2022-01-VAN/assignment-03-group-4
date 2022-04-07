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

interface IUser {
  email: string;
  password: string;
  name?: string;
  createdAt?: Date;

  recipes: Types.ObjectId[];
  reviews: Types.ObjectId[];
}
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },

  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
const User = model<IUser>("User", userSchema);

interface IRecipe {
  title: string;
  body: string;
  score?: number;
  createdAt: Date;

  author: Types.ObjectId;
  categories: Types.ObjectId[];
  reviews: Types.ObjectId[];
}
const recipeSchema = new Schema<IRecipe>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    min: 1,
    max: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  ],
});
const Recipe = model<IRecipe>("Recipe", recipeSchema);

app.post("/users", async (req: Request, res: Response) => {
  try {
    const newUser: HydratedDocument<IUser> = new User({
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

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
