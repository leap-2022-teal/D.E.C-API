import { Request, Response } from "express";
import { category } from "./category.model";

export async function getCategory(req: Request, res: Response) {
  const { q } = req.query;
  const qregex = new RegExp(`${q}`, "i");
  const list = await category.find({ name: qregex }, "", { sort: { name: 1 } });
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
  await category.deleteMany({ parentId: id });
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
