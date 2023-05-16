"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bag = void 0;
const mongoose_1 = require("mongoose");
const bagSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Products", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
exports.Bag = (0, mongoose_1.model)("Order", bagSchema);
