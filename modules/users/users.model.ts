import { Schema, model } from "mongoose";

interface Users {
  name: string;
  email: string;
  password: string;
  role?: string;
}
const usersSchema = new Schema<Users>({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
});
export const users = model("Users", usersSchema);
