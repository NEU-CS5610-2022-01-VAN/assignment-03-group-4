import { Types, Schema, model } from "mongoose";
import { recipeSchema } from "./recipe";

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

export { User };
