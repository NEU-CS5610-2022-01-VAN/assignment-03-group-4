import { Types, Schema, model } from "mongoose";

interface IRecipe {
  title: string;
  body: string;
  rating?: number;
  createdAt?: Date;
  image?: Buffer;

  author: String;
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
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: {
      data: Buffer,
      contentType: String,
    },

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

// recipeSchema.pre("find", function () {
//   this.populate("reviews").populate("categories");
// });

// recipeSchema.pre("find", function (next) {
//   // if ((this as any).options._recursed) {
//   //   return next();
//   // }
//   this.populate({
//     path: "reviews author categories",
//     options: { _recursed: true },
//   });
//   next();
// });

const Recipe = model<IRecipe>("Recipe", recipeSchema);

export { Recipe, recipeSchema };
