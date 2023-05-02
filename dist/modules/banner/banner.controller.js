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
exports.updateBannerById = exports.deleteBannerById = exports.createNewBanner = exports.getBannerById = exports.getBanner = void 0;
const banner_model_1 = require("./banner.model");
function getBanner(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield banner_model_1.Banner.find({}, null);
        res.json(list);
    });
}
exports.getBanner = getBanner;
function getBannerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params;
        const one = yield banner_model_1.Banner.findById({ _id: id });
        res.json(one);
    });
}
exports.getBannerById = getBannerById;
function createNewBanner(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = req.body;
        console.log(newProduct);
        yield banner_model_1.Banner.create(newProduct);
        res.sendStatus(200);
    });
}
exports.createNewBanner = createNewBanner;
function deleteBannerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield banner_model_1.Banner.findByIdAndRemove({ _id: id });
        res.json({ removedId: id });
    });
}
exports.deleteBannerById = deleteBannerById;
function updateBannerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updatedFields = req.body;
        yield banner_model_1.Banner.findByIdAndUpdate({ _id: id }, updatedFields);
        res.json({ updatedId: id });
    });
}
exports.updateBannerById = updateBannerById;
