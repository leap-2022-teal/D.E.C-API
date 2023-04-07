import { Request, Response } from "express";
import { category } from "./category.model";

export async function getComments(req: Request, res: Response) {
  const list = await category.find({}, null, { sort: { title: 1 }, limit: 100 });
  res.json(list);
}

export async function getCommentById(req: Request, res: Response) {
  const id = req.params;
  const one = await category.findById({ _id: id });
  res.json(one);
}
