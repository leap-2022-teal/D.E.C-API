"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String },
    subCategories: [{ title: String }],
});
exports.category = (0, mongoose_1.model)("Category", CategorySchema);
