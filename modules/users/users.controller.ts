import { Request, Response } from "express";
import { users } from "./users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUsers(req: Request, res: Response) {
  const list = await users.find({}, null);
  res.json(list);
}

export async function getCurrentUser(req: any, res: Response) {
  const { userId } = req;
  if (!userId) {
    return res.sendStatus(403);
  }

  const currentUser = await users.findById(userId);

  res.json(currentUser);
}
export async function getUsersById(req: Request, res: Response) {
  const id = req.params;
  const one = await users.findById({ _id: id });
  res.json(one);
}
export async function createNewUsers(req: Request, res: Response) {
  const newUsers = req.body;
  console.log(req, "this req");
  console.log(newUsers, "new user");
  if (newUsers.address) {
    newUsers.isGuest = true;
  }
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

export async function userRegistration(req: Request, res: Response) {
  const { formData } = req.body;
  console.log(formData, "hi data");
  const myPlaintextPassword = formData.password;
  const oneList = await users.findOne({ $and: [{ email: formData.email }, { isGuest: false }] });

  if (oneList) {
    res.status(400).json({ message: "Something went wrong" });
  } else {
    bcrypt.hash(myPlaintextPassword, 10, async function (err: any, hash: any) {
      formData.password = hash;
      try {
        await users.create(formData);
        res.sendStatus(200);
      } catch (error) {
        res.status(400).json({ error });
      }
    });
  }
}

export async function authenticateUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const one = await users.findOne({ email });

  if (!one) {
    return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
  }

  const verified = bcrypt.compare(password, one.password);

  if (!verified) {
    res.status(401).json({ message: "Нууц үг буруу байна" });
  }

  const accessToken = jwt.sign({ id: one._id, role: one.role }, `${process.env.SECRET_KEY}`, { expiresIn: 86400 });

  res.status(200).json({ accessToken, one });
}
