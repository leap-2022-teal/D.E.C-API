import { Router } from "express";
import { createNewProduct, deleteProductById, getFilteredProducts, getProduct, getProductById, updateProductById } from "./product.controller";

const router = Router();

// router.post("/filter/",getFilteredProducts)
router.get("/", getProduct);
router.get("/:id", getProductById);
router.post("/", createNewProduct);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);
export const productRouter = router;
