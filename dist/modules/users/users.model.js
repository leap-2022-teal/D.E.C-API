"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
});
exports.users = (0, mongoose_1.model)("Users", usersSchema);
