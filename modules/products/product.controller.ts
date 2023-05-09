import { Request, Response } from "express";
import { products } from "./product.model";

export async function getProduct(req: Request, res: Response) {
  const { searchQuery } = req.query;
  const { categoryId } = req.query;
  const qregex = new RegExp(`${searchQuery}`, "i");

  // console.log(req);

  if (categoryId) {
    const list = await products.find({ $and: [{ name: qregex }, { categoryId: categoryId }] }, "", { sort: { name: 1 } });
    res.json(list);
  } else {
    const list = await products.find({ name: qregex }, "", { sort: { name: 1 } });
    res.json(list);
  }
}
export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  const one = await products.findById({ _id: id });
  res.json(one);
}
export async function createNewProduct(req: Request, res: Response) {
  const newProduct = req.body;
  console.log(req.body);
  console.log(newProduct);
  await products.create(newProduct.data);
  res.sendStatus(200);
}
export async function deleteProductById(req: Request, res: Response) {
  const { id } = req.params;
  await products.findByIdAndRemove({ _id: id });
  res.json({ removedId: id });
}
export async function updateProductById(req: Request, res: Response) {
  const { id } = req.params;
  const updatedFields = req.body;
  await products.findByIdAndUpdate({ _id: id }, updatedFields);
  res.json({ updatedId: id });
}
