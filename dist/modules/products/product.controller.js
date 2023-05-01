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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductById = exports.deleteProductById = exports.createNewProduct = exports.getProductById = exports.getProduct = void 0;
const product_model_1 = require("./product.model");
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { searchQuery } = req.query;
        const { categoryId } = req.query;
        const qregex = new RegExp(`${searchQuery}`, "i");
        // console.log(req);
        if (categoryId) {
            const list = yield product_model_1.products.find({ $and: [{ name: qregex }, { categoryId: categoryId }] }, "", { sort: { name: 1 } });
            res.json(list);
        }
        else {
            const list = yield product_model_1.products.find({ name: qregex }, "", { sort: { name: 1 } });
            res.json(list);
        }
    });
}
exports.getProduct = getProduct;
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params;
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
