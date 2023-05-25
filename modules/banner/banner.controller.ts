import { Request, Response } from "express";
import { Banner } from "./banner.model";

export async function getBanner(req: Request, res: Response) {
  const list = await Banner.find({}, null);
  res.json(list);
}
export async function getBannerById(req: Request, res: Response) {
  const id = req.params;
  const one = await Banner.findById({ _id: id });
  res.json(one);
}
export async function createNewBanner(req: Request, res: Response) {
  const newBanner = req.body;
  await Banner.create(newBanner);
  res.sendStatus(200);
}
export async function deleteBannerById(req: Request, res: Response) {
  const { id } = req.params;
  await Banner.findByIdAndRemove({ _id: id });
  res.json({ removedId: id });
}
export async function updateBannerById(req: Request, res: Response) {
  const { id } = req.params;
  const updatedFields = req.body;
  await Banner.findByIdAndUpdate({ _id: id }, updatedFields);
  res.json({ updatedId: id });
}
