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
exports.updateUsersById = exports.deleteUsersById = exports.createNewUsers = exports.getUsersById = exports.getUsers = void 0;
const users_model_1 = require("./users.model");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield users_model_1.users.find({}, null);
        res.json(list);
    });
}
exports.getUsers = getUsers;
function getUsersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params;
        const one = yield users_model_1.users.findById({ _id: id });
        res.json(one);
    });
}
exports.getUsersById = getUsersById;
function createNewUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = req.body;
        console.log(newProduct);
        yield users_model_1.users.create(newProduct);
        res.sendStatus(200);
    });
}
exports.createNewUsers = createNewUsers;
function deleteUsersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield users_model_1.users.findByIdAndRemove({ _id: id });
        res.json({ removedId: id });
    });
}
exports.deleteUsersById = deleteUsersById;
function updateUsersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updatedFields = req.body;
        yield users_model_1.users.findByIdAndUpdate({ _id: id }, updatedFields);
        res.json({ updatedId: id });
    });
}
exports.updateUsersById = updateUsersById;
