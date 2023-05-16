import { Request, Response } from "express";
import { users } from "./users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const { formData } = req.body;
  const myPlaintextPassword = formData.password;
  bcrypt.hash(myPlaintextPassword, 10, async function (err: any, hash: any) {
    formData.password = hash;
    console.log(formData);
    try {
      await users.create(formData);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ error });
    }
  });
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

//  login autherzation admin

export async function userAuthentication(req: Request, res: Response) {
  const { email, password } = req.body;
  const one: any = await users.findOne({ email });
  if (one) {
    // bcrypt.compare(password, one.password, function (err: any, result: any) {
    //   if (result) {
        const token = jwt.sign({ users_id: one._id, role: one.role }, `${process.env.JWT_SECRET}`);
        res.status(200).json({ one });
      } else {
        res.status(400).json({ message: "Оруулсан мэдээлэл буруу байна" });
      }
//     });
//   } else {
//     res.status(400).json({ message: "Оруулсан мэдээлэл буруу байна" });
//   }
}
