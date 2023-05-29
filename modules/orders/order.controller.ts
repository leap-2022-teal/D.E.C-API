import { Request, Response } from "express";
import { Order } from "./order.model";

export async function getOrder(req: Request, res: Response) {
  const { customer } = req.query;
  console.log(customer);
  if (customer) {
    try {
      const list = await Order.find({ customer: customer }, "", { sort: { orderDate: 1 } });
      console.log(list);
      res.json(list);
    } catch (error) {
      res.status(400).send("Invalid parentId");
    }
  } else {
    const list = await Order.find({}, "", { sort: { orderDate: 1 } });
    res.json(list);
  }
}
export async function getOrderById(req: Request, res: Response) {
  const { id } = req.params;
  const one = await Order.findById({ _id: id });
  res.json(one);
}
export async function createNewOrder(req: Request, res: Response) {
  const newOrders = req.body;
  await Order.create(newOrders);
  try {
    res.json(newOrders.products);
  } catch {
    res.sendStatus(500);
  }
}
export async function deleteOrderById(req: Request, res: Response) {
  const { id } = req.params;
  await Order.findByIdAndRemove({ _id: id });
  res.json({ removedId: id });
}
export async function updateOrderById(req: Request, res: Response) {
  const { id } = req.params;
  const newProduct = req.body;
  const one = await Order.findById({ _id: id });
  if (one) {
    one?.products.push(newProduct);
    await Order.findByIdAndUpdate({ _id: id }, one);
    res.json({ updatedId: id });
  } else {
    res.json({ message: "not found" });
  }
}
