import express from "express";
// import pkg from "@prisma/client";
import Joi from "joi";
import cors from "cors";
import morgan from "morgan";
import { createValidator } from "express-joi-validation";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// const { PrismaClient } = pkg;
// const prisma = new PrismaClient();

const validator = createValidator({});

const port = parseInt(process.env.PORT) || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Server is working.</h1>");
});
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
