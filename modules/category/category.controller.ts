import { Request, Response } from "express";
import { category } from "./category.model";

export async function getCategory(req: Request, res: Response) {
  const list = await category.find({}, null, {
    sort: { title: 1 },
    limit: 100,
  });
  res.json(list);
}

export async function getCategoryById(req: Request, res: Response) {
  const id = req.params;
  const one = await category.findById({ _id: id });
  res.json(one);
}
export async function createNewCategory(req: Request, res: Response) {
  const newCategory = req.body;
  console.log(newCategory);
  await category.create(newCategory);
  res.sendStatus(200);
}
