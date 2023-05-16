import { Schema, model, Types } from "mongoose";

interface BagProduct {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

const bagSchema = new Schema<BagProduct>({
  productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Bag = model<BagProduct>("Order", bagSchema);
