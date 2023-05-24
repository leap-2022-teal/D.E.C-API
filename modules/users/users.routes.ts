import { Router } from "express";
import { authenticateUser, createNewUsers, deleteUsersById, getCurrentUser, getUsers, getUsersById, updateUsersById, userRegistration } from "./users.controller";
import auth from "../middleware/auth";

const router = Router();
router.get("/", getUsers);
router.post("/", createNewUsers);
router.get("/me", auth, getCurrentUser);
router.get("/:id", auth, getUsersById);
router.post("/register", userRegistration);
router.post("/login", authenticateUser);
router.delete("/:id", auth, deleteUsersById);
router.put("/:id", updateUsersById);
export const usersRouter = router;
