"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const category_routes_1 = require("./modules/category/category.routes");
const product_routes_1 = require("./modules/products/product.routes");
const users_routes_1 = require("./modules/users/users.routes");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
mongoose_1.default
    .connect(`${process.env.MONGODB_STRING}`)
    .then(() => console.log("MongoDB Connected ✅"));
cloudinary_1.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
const port = process.env.PORT;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/tmp/");
    },
    filename: function (req, file, cb) {
        const extentsion = file.originalname.split(".").pop();
        cb(null, `${(0, uuid_1.v4)()}.${extentsion}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});
app.post("/upload-image", upload.single("image"), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.file) {
            const cloudinaryImage = yield cloudinary_1.v2.uploader.upload(req.file.path);
            return res.json({
                path: cloudinaryImage.secure_url,
                width: cloudinaryImage.width,
                height: cloudinaryImage.height,
            });
        }
    });
});
app.use("/categories", category_routes_1.categoriesRouter);
app.use("/products", product_routes_1.productRouter);
app.use("/users", users_routes_1.usersRouter);
app.listen(port, () => {
    console.log(`Server started at ${port} 🎉`);
});
