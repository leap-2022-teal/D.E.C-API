"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const router = (0, express_1.Router)();
router.get("/", users_controller_1.getUsers);
router.get("/:id", users_controller_1.getUsersById);
router.post("/register", users_controller_1.createNewUsers);
router.post("/", users_controller_1.userAuthentication);
router.delete("/:id", users_controller_1.deleteUsersById);
router.put("/:id", users_controller_1.updateUsersById);
exports.usersRouter = router;
