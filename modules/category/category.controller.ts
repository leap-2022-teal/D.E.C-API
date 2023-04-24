import { Request, Response } from "express";
import { category } from "./category.model";

export async function getCategory(req: Request, res: Response) {
  const list = await category
    .find({}, null, {
      sort: { name: 1 },
      limit: 100,
    })
    .populate("parent");

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
  try {
    await category.create(newCategory);
    res.sendStatus(200);
  } catch {
    res.json({ status: 400, message: "Something went wrong" });
  }
}
export async function deleteCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  await category.findByIdAndRemove({ _id: id });
  res.status(200);
}
export async function updateCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    await category.findByIdAndUpdate({ _id: id }, updatedFields);
    res.json({ updatedId: id });
  } catch {
    res.json({ status: 400, message: "Something went wrong" });
  }
}
