import { model, ObjectId, Schema } from "mongoose";

interface Stock {
  size: number;
  stock: number;
}

interface Image {
  path: string;
  width: number;
  height: number;
}

interface Products {
  name: string;
  color: string;
  image?: Image[];
  sizes: Stock[];
  details: string;
  brand?: string;
  price: number;
  categoryId: ObjectId;
  subCategoryId: ObjectId;
}
export const productsScema = new Schema<Products>({
  name: { type: String },
  color: { type: String },
  image: [
    {
      path: { type: String, default: "" },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },
  ],
  sizes: [{ size: Number, stock: Number }, { nullable: true }],
  details: { type: String },
  brand: { type: String, nullable: true },
  price: { type: Number },

  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  subCategoryId: { type: Schema.Types.ObjectId, ref: "Category" },
});
export const products = model("Products", productsScema);
