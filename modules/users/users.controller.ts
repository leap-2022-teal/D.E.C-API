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
  const newUsers = req.body 
  console.log(req , "this req")
  console.log(newUsers , "new user")
  try {
    const createdUser = await users.create(newUsers);
    res.status(200).json(createdUser._id);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }

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
