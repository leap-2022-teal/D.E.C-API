"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get("/", users_controller_1.getUsers);
router.post("/", users_controller_1.createNewUsers);
router.get("/me", auth_1.default, users_controller_1.getCurrentUser);
router.get("/:id", auth_1.default, users_controller_1.getUsersById);
router.post("/register", users_controller_1.userRegistration);
router.post("/login", users_controller_1.authenticateUser);
router.delete("/:id", auth_1.default, users_controller_1.deleteUsersById);
router.put("/:id", users_controller_1.updateUsersById);
exports.usersRouter = router;
