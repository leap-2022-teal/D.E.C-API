import { Router } from "express";
import {
  createNewUsers,
  deleteUsersById,
  getUsers,
  getUsersById,
  updateUsersById,
} from "./users.controller";

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/:id", createNewUsers);
router.delete("/:id", deleteUsersById);
router.put("/:id", updateUsersById);
export const usersRouter = router;
