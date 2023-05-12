import { Router } from "express";
import { createNewCategory, deleteCategoryById, getCategory, getCategoryById, updateCategoryById } from "./category.controller";

const router = Router();

router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.post("/", createNewCategory);
router.delete("/:id", deleteCategoryById);
router.put("/:id", updateCategoryById);
export const categoriesRouter = router;
