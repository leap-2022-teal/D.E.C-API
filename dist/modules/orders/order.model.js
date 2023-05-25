"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../products/product.model");
const orderProduct = new mongoose_1.Schema({
    id: { type: String },
    size: { type: Number },
    quantity: { type: Number },
    products: { type: product_model_1.productsScema },
});
const orderSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: false },
    products: { type: [orderProduct] },
    totalPrice: { type: Number, required: false },
    orderDate: { type: Date, default: Date.now },
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
