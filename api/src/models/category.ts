import { Types, Schema, model } from "mongoose";

interface ICategory {
  name: string;

  // recipes: Types.ObjectId[];
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  // recipes: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Recipe",
  //   },
  // ],
});

const Category = model<ICategory>("Category", categorySchema);

export { Category, categorySchema };
