import { Router } from "express";
import { authenticateUser, deleteUsersById, getUsers, getUsersById, updateUsersById, userRegistration } from "./users.controller";

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/register", userRegistration);
router.post("/login", authenticateUser);
router.delete("/:id", deleteUsersById);
router.put("/:id", updateUsersById);
export const usersRouter = router;
