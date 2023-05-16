"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    orderId: { type: String, required: true, unique: true },
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true },
    products: [
        {
            productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Products", required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
