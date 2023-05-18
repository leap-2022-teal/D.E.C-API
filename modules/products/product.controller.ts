import { Request, Response } from "express";
import { products } from "./product.model";
import { ObjectId } from "mongoose";

export async function getProduct(req: Request, res: Response) {
  const { searchQuery, categoryId, categoryIds, size, color, price } = req.query;

  const filter: any = {};

  if (color?.length) {
    filter.color = { $in: color };
  }

  if (categoryIds?.length) {
    filter.categoryId = { $in: categoryIds };
  }

  if (size?.length) {
    filter["sizes.size"] = { $in: size };
  }

  // if (price.length > 1) {
  //   filter.price = { $and: [{ price: { $gte:  } }, { price: { $lte: 2 } }] };
  // }

  if (searchQuery?.length) {
    const qregex = new RegExp(`${searchQuery}`, "i");
    filter["name"] = qregex;
  }

  if (categoryId && typeof categoryId === "string") {
    const id = categoryId;
    filter["$or"] = [{ subCategoryId: categoryId }, { categoryId: categoryId }];
  }
  const list = await products.find(filter);
  res.json(list);
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
