import express, { Express, Request, Response } from "express";
import Joi from "joi";
// import cors from "cors";
import { Schema, model, connect, Types, HydratedDocument } from "mongoose";
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
});

const User = model<IUser>("User", userSchema);

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
