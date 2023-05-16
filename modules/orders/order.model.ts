import { Schema, model, Document, Types } from "mongoose";

interface OrderProduct {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  orderId: string;
  customer: Types.ObjectId;
  products: OrderProduct[];
  totalPrice: number;
  orderDate: Date;
}

const orderSchema = new Schema<Order>({
  orderId: { type: String, required: true, unique: true },
  customer: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

export const Order = model<Order>("Order", orderSchema);
