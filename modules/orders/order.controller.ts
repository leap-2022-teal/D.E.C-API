import { Request, Response } from "express";
import { Order } from "./order.model";

export async function getOrder(req: Request, res: Response) {
  const list = await Order.find({}, null);
  res.json(list);
}
export async function getOrderById(req: Request, res: Response) {
  const id = req.params;
  const one = await Order.findById({ _id: id });
  res.json(one);
}
export async function createNewOrder(req: Request, res: Response) {
  const newOrders = req.body;
  console.log(newOrders);
  await Order.create(newOrders);
  res.sendStatus(200);
}
export async function deleteOrderById(req: Request, res: Response) {
  const { id } = req.params;
  await Order.findByIdAndRemove({ _id: id });
  res.json({ removedId: id });
}
export async function updateOrderById(req: Request, res: Response) {
  const { id } = req.params;
  const updatedFields = req.body;
  await Order.findByIdAndUpdate({ _id: id }, updatedFields);
  res.json({ updatedId: id });
  console.log(updatedFields);
}
