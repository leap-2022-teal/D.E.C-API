"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const mongoose_1 = require("mongoose");
const productsScema = new mongoose_1.Schema({
    name: { type: String },
    color: [String],
    image: {
        path: String,
        width: Number,
        height: Number,
    },
    sizes: [{ size: Number, stock: Number }, { nullable: true }],
    details: { type: String },
    brand: { type: String, nullable: true },
    price: { type: Number },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: "category" },
    subId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "category.subCategories",
        nullable: true,
    },
});
exports.products = (0, mongoose_1.model)("Products", productsScema);
