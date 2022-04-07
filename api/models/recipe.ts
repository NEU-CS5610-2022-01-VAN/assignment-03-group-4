import { Types, Schema, model } from "mongoose";

interface IRecipe {
  title: string;
  body: string;
  score?: number;
  createdAt?: Date;

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
    max: 5,
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
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Recipe = model<IRecipe>("Recipe", recipeSchema);

export { Recipe };
