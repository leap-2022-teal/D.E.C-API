import { Schema, model } from "mongoose";

interface Users {
  name: string;
  email: string;
  password: string;
  state?: string;
  role?: string;
  location?: string;
  phoneNumber?: number;
  isGuest: boolean;
}
const usersSchema = new Schema<Users>({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  state: { type: String },
  role: { type: String },
  location: { type: String },
  phoneNumber: { type: Number },
  isGuest: { type: Boolean, default: false },
});
export const users = model("Users", usersSchema);
