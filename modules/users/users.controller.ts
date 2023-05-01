import { Request, Response } from "express";
import { users } from "./users.model";
import bcrypt from "bcrypt"
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


//  login autherzation admin

export async function adminAuthentication(req: Request, res: Response) {
  const {email ,password} = req.body;
  const one = await users.findOne({email : email});
  console.log("one: ",one)
  console.log("password: ",password)
  if (one && one.password == password) {
    const token = jwt.sign({users_id : one._id}, `${process.env.JWT_SECRET}`)
       console.log(token)
       res.status(200).json({token : token})
  //  bcrypt.compare(password, one.password, function (err : any, result : any) { 
  //   console.log(result)
    //  if(result){
    //    const token = jwt.sign({users_id : one._id}, `${process.env.JWT_SECRET}`)
    //    console.log(token)
    //    res.status(200).json({token : token})
    //  } else {
    //    res.status(400).json({ message: "Something went wrong" });
    //  }
  //  })
  console.log("yes authenticated")
  
  } else {
   res.status(400).json({message : "Something went wrong" })
  }
 }