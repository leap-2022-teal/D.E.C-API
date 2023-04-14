import { Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  getProduct,
  getProductById,
  updateProductById,
} from "./product.controller";

const router = Router();

router.get("/", getProduct);
router.get("/:id", getProductById);
router.post("/", createNewProduct);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);
export const productRouter = router;
