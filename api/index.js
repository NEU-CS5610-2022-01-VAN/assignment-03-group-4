import express from "express";
import pkg from "@prisma/client";
import Joi from "joi";
import cors from "cors";
import morgan from "morgan";
import { createValidator } from "express-joi-validation";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const validator = createValidator({});

app.post("/users", async (req, res) => {
  const newUser = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    },
  });

  res.send(newUser);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

const port = parseInt(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
