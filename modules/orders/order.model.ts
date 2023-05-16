import { Schema, model, Document, Types } from "mongoose";

interface OrderProduct {
  productId: Types.ObjectId;
  size: number;
  quantity: number;
}

interface Order {
  customer: Types.ObjectId;
  products: OrderProduct[];
  totalPrice: number;
  orderDate: Date;
}

const orderSchema = new Schema<Order>({
  customer: { type: Schema.Types.ObjectId, ref: "Users", required: false },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
      size: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: false },
  orderDate: { type: Date, default: Date.now },
});

export const Order = model<Order>("Order", orderSchema);
