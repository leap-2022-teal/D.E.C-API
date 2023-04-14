import { Request, Response } from "express";
import { product } from "./product.model";

export async function getProduct(req: Request, res: Response) {
  const list = await product.find({}, null, {
    sort: { title: 1 },
    limit: 100,
  });
  res.json(list);
}
export async function getProductById(req: Request, res: Response) {
  const id = req.params;
  const one = await product.findById({ _id: id });
  res.json(one);
}
export async function createNewProduct(req: Request, res: Response) {
  const newProduct = req.body;
  console.log(newProduct);
  await product.create(newProduct);
  res.sendStatus(200);
}
export async function deleteProductById(req: Request, res: Response) {
  const { id } = req.params;
  await product.findByIdAndRemove({ _id: id });
  res.json({ removedId: id });
}
export async function updateProductById(req: Request, res: Response) {
  const { id } = req.params;
  const updatedFields = req.body;
  await product.findByIdAndUpdate({ _id: id }, updatedFields);
  res.json({ updatedId: id });
}
