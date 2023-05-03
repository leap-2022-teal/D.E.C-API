import { Router } from "express";
import {
  adminAuthentication,
  createNewUsers,
  deleteUsersById,
  getUsers,
  getUsersById,
  updateUsersById,
  userAuthentication,
} from "./users.controller";

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/register", createNewUsers);
router.post("/login", userAuthentication)
router.delete("/:id", deleteUsersById);
router.put("/:id", updateUsersById);
router.post("/" , adminAuthentication)
export const usersRouter = router;
