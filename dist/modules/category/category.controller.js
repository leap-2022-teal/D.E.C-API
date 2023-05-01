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
exports.updateCategoryById = exports.deleteCategoryById = exports.createNewCategory = exports.getCategoryById = exports.getCategory = void 0;
const category_model_1 = require("./category.model");
const mongoose_1 = __importDefault(require("mongoose"));
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { q } = req.query;
        const parentId = req.query.parentId;
        const qregex = new RegExp(`${q}`, "i");
        if (parentId) {
            try {
                const objParentId = new mongoose_1.default.Types.ObjectId(parentId);
                const list = yield category_model_1.category.find({ $or: [{ name: qregex }, { parentId: objParentId }] }, "", { sort: { name: 1 } });
                res.json(list);
                console.log(list);
            }
            catch (error) {
                res.status(400).send("Invalid parentId");
            }
        }
        else {
            const list = yield category_model_1.category.find({ name: qregex }, "", { sort: { name: 1 } });
            res.json(list);
        }
    });
}
exports.getCategory = getCategory;
function getCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params;
        const one = yield category_model_1.category.findById({ _id: id });
        res.json(one);
    });
}
exports.getCategoryById = getCategoryById;
function createNewCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCategory = req.body;
        console.log(newCategory);
        try {
            yield category_model_1.category.create(newCategory);
            res.sendStatus(200);
        }
        catch (_a) {
            res.json({ status: 400, message: "Something went wrong" });
        }
    });
}
exports.createNewCategory = createNewCategory;
function deleteCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield category_model_1.category.findByIdAndRemove({ _id: id });
        yield category_model_1.category.deleteMany({ parentId: id });
        res.status(200);
    });
}
exports.deleteCategoryById = deleteCategoryById;
function updateCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updatedFields = req.body;
        try {
            yield category_model_1.category.findByIdAndUpdate({ _id: id }, updatedFields);
            res.json({ updatedId: id });
        }
        catch (_a) {
            res.json({ status: 400, message: "Something went wrong" });
        }
    });
}
exports.updateCategoryById = updateCategoryById;
