"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const mongoose_1 = require("mongoose");
const BannerSchema = new mongoose_1.Schema({
    name: { type: String },
    image: {
        path: { type: String, default: "" },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
    },
    details: { type: String },
    link: { type: String },

    categoryId: { type: String, ref: "category.categoryId", default: "" },
    position: { type: String },
});
exports.Banner = (0, mongoose_1.model)("Banner", BannerSchema);
