import { Router } from "express";
import { authenticateUser, deleteUsersById, getCurrentUser, getUsers, getUsersById, updateUsersById, userRegistration } from "./users.controller";
import auth from "../middleware/auth";

const router = Router();
router.get("/", getUsers);

router.get("/me" , auth, getCurrentUser);
router.get("/:id", auth, getUsersById);
router.post("/register", userRegistration);
router.post("/login", authenticateUser);
router.delete("/:id",auth, deleteUsersById);
router.put("/:id", updateUsersById);
export const usersRouter = router;
