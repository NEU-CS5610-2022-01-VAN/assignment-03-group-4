import { Schema, model } from "mongoose";

interface IUser {
  _id: string;
  // auth0Id: string;
  email: string;
  // password: string;
  name?: string;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      // unique: true,
      // required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    name: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
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

// only id in populated recipes
// userSchema.pre("find", function () {
//   this.populate("recipes", "id -author");
// });

userSchema.virtual("recipes", {
  ref: "Recipe",
  localField: "_id",
  foreignField: "author",
});

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "author",
});

userSchema.pre("find", function () {
  this.populate("recipes").populate("reviews");
});

const User = model<IUser>("User", userSchema);

export { User };
