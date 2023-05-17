"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
// router.post("/filter/",getFilteredProducts)
router.get("/", product_controller_1.getProduct);
router.get("/:id", product_controller_1.getProductById);
router.post("/", product_controller_1.createNewProduct);
router.delete("/:id", product_controller_1.deleteProductById);
router.put("/:id", product_controller_1.updateProductById);
exports.productRouter = router;
