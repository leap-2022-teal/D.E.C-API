import { Router } from "express";
import {
  adminAuthentication,
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
router.post("/" , adminAuthentication)
export const usersRouter = router;
