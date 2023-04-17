"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const mongoose_1 = require("mongoose");
const productsScema = new mongoose_1.Schema({
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
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: "category" },
    subId: { type: mongoose_1.Schema.Types.ObjectId, ref: "category.subCategories" },
});
exports.products = (0, mongoose_1.model)("Products", productsScema);
