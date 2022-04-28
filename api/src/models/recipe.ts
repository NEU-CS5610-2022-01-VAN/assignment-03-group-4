import { Types, Schema, model } from "mongoose";

interface IRecipe {
  title: string;
  body: string;
  cookingTime: number;
  rating?: number;
  ingredients: String[];
  instructions: String[];
  youtubeVideoId?: String;
  author: String;
  categories: Types.ObjectId[];
  photos: Types.ObjectId[];
}

const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    youtubeVideoId: { type: String },
    author: {
      type: String,
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
    photos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
  },
  {
    //add virtual fields to json and object
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

recipeSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "recipe",
});

const Recipe = model<IRecipe>("Recipe", recipeSchema);

export { IRecipe, recipeSchema, Recipe };
