import { model, ObjectId, Schema } from "mongoose";

interface Category {
  name: string;
  parentId?: ObjectId;
}

const CategorySchema = new Schema<Category>({
  name: { type: String },
  parentId: { type: Schema.Types.ObjectId, ref: "Category" },
});

CategorySchema.virtual("parent", {
  ref: "Category",
  localField: "parentId",
  foreignField: "_id",
  justOne: true,
});

// CategorySchema.virtual("subCategory").get(function () {
//   return this.name;
// });

// CategorySchema.virtual("subCategory", {
//   ref: "Category",
//   localField: "_id",
//   foreignField: "parentId",
// });

export const category = model("Category", CategorySchema);
