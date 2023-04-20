import { model, ObjectId, Schema } from "mongoose";

interface Stock {
  size: number;
  stock: number;
}

interface Products {
  name: string;
  color: string;
  image?: {};
  sizes: Stock[];
  details: string;
  brand?: string;
  price: number;
  categoryId: ObjectId;
  subId?: ObjectId;
}
const productsScema = new Schema<Products>({
  name: { type: String },
  color: { type: String },
  image: {
    path: { type: String, default: "" },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  sizes: [{ size: Number, stock: Number }, { nullable: true }],
  details: { type: String },
  brand: { type: String, nullable: true },
  price: { type: Number },

  categoryId: { type: Schema.Types.ObjectId, ref: "category" },
  subId: {
    type: Schema.Types.ObjectId,
    ref: "category.subCategories",
    nullable: true,
  },
});
export const products = model("Products", productsScema);
