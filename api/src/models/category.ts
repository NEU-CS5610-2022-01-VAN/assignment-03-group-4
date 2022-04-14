import { Schema, model } from "mongoose";

interface ICategory {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = model<ICategory>("Category", categorySchema);

export { Category, categorySchema };
