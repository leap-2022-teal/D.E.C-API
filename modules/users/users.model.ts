import { Schema, model } from "mongoose";

interface Users {
  userName: string;
  email: string;
  password: string;
  role?: string;
}
const usersSchema = new Schema<Users>({
  userName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
});
export const users = model("Users", usersSchema);
