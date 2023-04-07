import { Router } from "express";
import { getCommentById, getComments } from "./category.controller";

const router = Router();

router.get("/", getComments);
router.get("/:id", getCommentById);
export const categoriesRouter = router;