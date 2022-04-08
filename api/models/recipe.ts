import { Types, Schema, model } from "mongoose";

interface IRecipe {
  title: string;
  body: string;
  score?: number;
  createdAt?: Date;

  author: Types.ObjectId;
  categories: Types.ObjectId[];
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
  },
  {
    //add populated fields to json and object
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

recipeSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "recipe",
});

recipeSchema.pre("find", function () {
  this.populate("reviews");
});

const Recipe = model<IRecipe>("Recipe", recipeSchema);

export { Recipe, recipeSchema };
