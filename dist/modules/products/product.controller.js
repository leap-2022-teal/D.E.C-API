"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredProducts = exports.updateProductById = exports.deleteProductById = exports.createNewProduct = exports.getProductById = exports.getProduct = void 0;
const product_model_1 = require("./product.model");
const mongoose_1 = __importDefault(require("mongoose"));
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(req.query)
        const { searchQuery, categoryId } = req.query;
        const qregex = new RegExp(`${searchQuery}`, "i");
        console.log(categoryId);
        const limit = parseInt(req.query.limit);
        if (categoryId) {
            if (mongoose_1.default.Types.ObjectId.isValid(categoryId.toString())) {
                const list = yield product_model_1.products.find({ $and: [{ name: qregex }, { $or: [{ subCategoryId: categoryId }, { categoryId: categoryId }] }] }, "", { sort: { name: 1 } }).limit(limit);
                res.json(list);
            }
            else {
                res.status(400).json({ error: "Invalid categoryId" });
            }
        }
        else {
            const list = yield product_model_1.products.find({ $or: [{ name: qregex }, { categoryId: null }] }, "", { sort: { name: 1 } }).limit(limit);
            res.json(list);
        }
    });
}
exports.getProduct = getProduct;
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const one = yield product_model_1.products.findById({ _id: id });
        res.json(one);
    });
}
exports.getProductById = getProductById;
function createNewProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = req.body;
        console.log(req.body);
        console.log(newProduct);
        yield product_model_1.products.create(newProduct.data);
        res.sendStatus(200);
    });
}
exports.createNewProduct = createNewProduct;
function deleteProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield product_model_1.products.findByIdAndRemove({ _id: id });
        res.json({ removedId: id });
    });
}
exports.deleteProductById = deleteProductById;
function updateProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updatedFields = req.body;
        yield product_model_1.products.findByIdAndUpdate({ _id: id }, updatedFields);
        res.json({ updatedId: id });
    });
}
exports.updateProductById = updateProductById;
function getFilteredProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { gender } = req.query;
        const { color } = req.query;
        const list = yield product_model_1.products.aggregate([
            { $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                } }, {
                $match: {
                    "category.name": gender
                }
            }
        ]);
        res.json(list);
        // }
    });
}
exports.getFilteredProducts = getFilteredProducts;
