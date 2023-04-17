import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { categoriesRouter } from "./modules/category/category.routes";
import { productRouter } from "./modules/products/product.routes";
import { usersRouter } from "./modules/users/users.routes";
import { CldImage, CldImageProps } from "next-cloudinary";
dotenv.config();

mongoose
  .connect(`${process.env.MONGODB_STRING}`)
  .then(() => console.log("MongoDB Connected ✅"));

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

app.use("/categories", categoriesRouter);
app.use("/products", productRouter);
app.use("/users", usersRouter);
app.listen(port, () => {
  console.log(`Server started at ${port} 🎉`);
});
