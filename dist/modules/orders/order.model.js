"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: false },
    products: [
        {
            productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Products", required: true },
            size: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: false },
    orderDate: { type: Date, default: Date.now },
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
