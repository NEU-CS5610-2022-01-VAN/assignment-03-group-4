import { Router, Request, Response } from "express";
import { User } from "../models/user";
import { checkJwt } from "../middlewares/check-jwt.middleware";

const router = Router();

router.post("/", checkJwt, async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    const newUser = new User({
      email,
      name,
      password,
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
    const users = await User.find();

    res.send(users);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId)
      .populate("recipes")
      .populate("reviews");

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.post("/:userId", checkJwt, async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { email, name, password } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        email,
        password,
        name,
      },
      { new: true }
    );

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/", checkJwt, async (req: Request, res: Response) => {
  try {
    const users = await User.deleteMany();

    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:userId", checkJwt, async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
