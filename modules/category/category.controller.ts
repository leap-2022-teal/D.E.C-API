import { Request, Response } from "express";
import { category } from "./category.model";
import mongoose from "mongoose";

export async function getCategory(req: Request, res: Response) {
  const { q } = req.query;
  const parentId = req.query.parentId as string | undefined;
  const qregex = new RegExp(`${q}`, "i");

  if (parentId) {
    try {
      const objParentId = new mongoose.Types.ObjectId(parentId);
      const list = await category.find({ $or: [{ name: qregex }, { parentId: objParentId }] }, "", { sort: { name: 1 } });
      res.json(list);
      console.log(list);
    } catch (error) {
      res.status(400).send("Invalid parentId");
    }
  } else {
    const list = await category.find({ name: qregex }, "", { sort: { name: 1 } });
    res.json(list);
  }
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
  try {
    const deletedCategory = await category.findByIdAndRemove({ _id: id });
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json({ message: "Category deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
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
