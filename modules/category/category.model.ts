import { model, Schema } from "mongoose";

interface SubCategories {
  title: string;
}

interface Category {
  name: string;
  subCategories: SubCategories[];
}

const CategorySchema = new Schema<Category>({
  name: { type: String },
  subCategories: [{ title: String }],
});

export const category = model("Category", CategorySchema);
