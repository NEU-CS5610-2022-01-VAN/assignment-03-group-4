import { Router, Request, Response } from "express";
import { User } from "../models/user";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
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

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).populate("recipes").exec();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("recipes")
      .exec();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.post("/:userId", async (req: Request, res: Response) => {
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

router.delete("/", async (req: Request, res: Response) => {
  try {
    const users = await User.deleteMany();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
