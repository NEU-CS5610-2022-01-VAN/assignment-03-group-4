import { Types, Schema, model } from "mongoose";

interface IReview {
  title: string;
  content: string;
  rating: number;
  recipe: Types.ObjectId;
  author: String;
}

const reviewSchema = new Schema<IReview>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    author: {
      type: String,
      ref: "Author",
      required: true,
    },
  },
  { timestamps: true }
);

const Review = model<IReview>("Review", reviewSchema);

export { Review };
