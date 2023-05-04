import { Router } from "express";
import { createNewUsers, deleteUsersById, getUsers, getUsersById, updateUsersById, userAuthentication } from "./users.controller";

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/register", createNewUsers);
router.post("/", userAuthentication);
router.delete("/:id", deleteUsersById);
router.put("/:id", updateUsersById);
export const usersRouter = router;
