"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String },
    parentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category" },
});
CategorySchema.virtual("parent", {
    ref: "Category",
    localField: "parentId",
    foreignField: "_id",
    justOne: true,
});
// CategorySchema.virtual("subCategory").get(function () {
//   return this.name;
// });
// CategorySchema.virtual("subCategory", {
//   ref: "Category",
//   localField: "_id",
//   foreignField: "parentId",
// });
exports.category = (0, mongoose_1.model)("Category", CategorySchema);
