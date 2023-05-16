import { Router } from "express";
import { createNewOrder, deleteOrderById, getOrder, getOrderById, updateOrderById } from "./order.controller";

const router = Router();
router.get("/", getOrder);
router.get("/:id", getOrderById);
router.post("/", createNewOrder);
router.delete("/:id", deleteOrderById);
router.put("/:id", updateOrderById);

export const orderRouter = router;
