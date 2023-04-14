import { model, ObjectId, Schema } from "mongoose";

interface Products {
  name: string;
  color: string;
  image: {};
  size: number[];
  details: string;
  brand: string;
  price: number;
  stock: number;
  categoryId: ObjectId;
  subId: ObjectId;
}
const productsScema = new Schema<Products>({
  name: { type: String },
  color: { type: String },
  image: {
    path: String,
    width: Number,
    height: Number,
  },
  size: [Number],
  details: { type: String },
  brand: { type: String },
  price: { type: Number },
  stock: { type: Number },
  categoryId: { type: Schema.Types.ObjectId, ref: "category" },
  subId: { type: Schema.Types.ObjectId, ref: "category.subCategories" },
});
export const product = model("Products", productsScema);
