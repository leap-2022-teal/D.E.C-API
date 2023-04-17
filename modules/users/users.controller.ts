import { Request, Response } from "express";
import { users } from "./users.model";

export async function getUsers(req: Request, res: Response) {
  const list = await users.find({}, null);
  res.json(list);
}
export async function getUsersById(req: Request, res: Response) {
  const id = req.params;
  const one = await users.findById({ _id: id });
  res.json(one);
}
export async function createNewUsers(req: Request, res: Response) {
  const newProduct = req.body;
  console.log(newProduct);
  await users.create(newProduct);
  res.sendStatus(200);
}
export async function deleteUsersById(req: Request, res: Response) {
  const { id } = req.params;
  await users.findByIdAndRemove({ _id: id });
  res.json({ removedId: id });
}
export async function updateUsersById(req: Request, res: Response) {
  const { id } = req.params;
  const updatedFields = req.body;
  await users.findByIdAndUpdate({ _id: id }, updatedFields);
  res.json({ updatedId: id });
}
