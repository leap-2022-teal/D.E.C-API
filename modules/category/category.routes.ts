import { Router } from "express";
import {
  createNewCategory,
  getCategory,
  getCategoryById,
} from "./category.controller";

const router = Router();

router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.post("/", createNewCategory);
export const categoriesRouter = router;
