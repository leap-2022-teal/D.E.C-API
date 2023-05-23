import { Schema, model } from "mongoose";

interface Users {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  state:string
  role?: string;
  location: string;
  phoneNumber: number;
}
const usersSchema = new Schema<Users>({
  firstName: { type: String },
  lastName:{type: String },
  email: { type: String },
  password: { type: String },
  state: {type:String},
  role: { type: String },
  location: { type: String },
  phoneNumber: { type: Number },
});
export const users = model("Users", usersSchema);
