import { Schema, model, Document, Types } from "mongoose";
import { productsScema } from "../products/product.model";
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
  categoryId: string;
  subCategoryId: string;
}
interface OrderProduct {
  id: string;
  size: number;
  quantity: number;
  products: Products;
}

interface Order {
  customer: Types.ObjectId;
  products: OrderProduct[];
  totalPrice: number;
  orderDate: Date;
}

const orderProduct = new Schema<OrderProduct>({
  id: { type: String },
  size: { type: Number },
  quantity: { type: Number },
  products: { type: productsScema },
});

const orderSchema = new Schema<Order>({
  customer: { type: Schema.Types.ObjectId, ref: "Users", required: false },
  products: { type: [orderProduct] },
  totalPrice: { type: Number, required: false },
  orderDate: { type: Date, default: Date.now },
});

export const Order = model<Order>("Order", orderSchema);
