import { Types, Schema, model } from "mongoose";

interface IReview {
  content: string;
  rating: number;
  createdAt?: Date;

  recipe: Types.ObjectId;
  author: String;
}

const reviewSchema = new Schema<IReview>({
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
});

const Review = model<IReview>("Review", reviewSchema);

export { Review };
