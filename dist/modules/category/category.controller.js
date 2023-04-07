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
exports.getCommentById = exports.getComments = void 0;
const category_model_1 = require("./category.model");
function getComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield category_model_1.category.find({}, null, { sort: { title: 1 }, limit: 100 });
        res.json(list);
    });
}
exports.getComments = getComments;
function getCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params;
        const one = yield category_model_1.category.findById({ _id: id });
        res.json(one);
    });
}
exports.getCommentById = getCommentById;
