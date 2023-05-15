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
exports.updateOrderById = exports.deleteOrderById = exports.createNewOrder = exports.getOrderById = exports.getOrder = void 0;
const order_model_1 = require("./order.model");
function getOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield order_model_1.Order.find({}, null);
        res.json(list);
    });
}
exports.getOrder = getOrder;
function getOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params;
        const one = yield order_model_1.Order.findById({ _id: id });
        res.json(one);
    });
}
exports.getOrderById = getOrderById;
function createNewOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newBanner = req.body;
        console.log(newBanner);
        yield order_model_1.Order.create(newBanner);
        res.sendStatus(200);
    });
}
exports.createNewOrder = createNewOrder;
function deleteOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield order_model_1.Order.findByIdAndRemove({ _id: id });
        res.json({ removedId: id });
    });
}
exports.deleteOrderById = deleteOrderById;
function updateOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updatedFields = req.body;
        yield order_model_1.Order.findByIdAndUpdate({ _id: id }, updatedFields);
        res.json({ updatedId: id });
        console.log(updatedFields);
    });
}
exports.updateOrderById = updateOrderById;
