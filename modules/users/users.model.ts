import { Schema, model } from "mongoose";

interface Users {
  name: string;
  email: string;
  password: string;
  role?: string;
  location: string;
  phoneNumber: number;
}
const usersSchema = new Schema<Users>({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  location: { type: String },
  phoneNumber: { type: Number },
});
export const users = model("Users", usersSchema);
