import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { categoriesRouter } from "./modules/category/category.routes";
import { productRouter } from "./modules/products/product.routes";
import { usersRouter } from "./modules/users/users.routes";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { bannerRouter } from "./modules/banner/banner.routes";
dotenv.config();

mongoose.connect(`${process.env.MONGODB_STRING}`).then(() => console.log("MongoDB Connected ✅"));

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app: Express = express();
const port = process.env.PORT;
const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "/tmp/");
  },
  filename: function (req: Request, file, cb) {
    const extentsion = file.originalname.split(".").pop();
    cb(null, `${uuidv4()}.${extentsion}`);
  },
});

const upload = multer({
  storage: storage,
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

app.post("/upload-image", upload.single("image"), async function (req: Request, res: Response, next) {
  if (req.file) {
    const cloudinaryImage = await cloudinary.uploader.upload(req.file.path);
    return res.json({
      path: cloudinaryImage.secure_url,
      width: cloudinaryImage.width,
      height: cloudinaryImage.height,
    });
  }
});
app.use("/categories", categoriesRouter);
app.use("/products", productRouter);
app.use("/users", usersRouter);
app.use("/banner", bannerRouter);
app.listen(port, () => {
  console.log(`Server started at ${port} 🎉`);
});
