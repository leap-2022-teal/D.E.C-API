"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const category_routes_1 = require("./modules/category/category.routes");
dotenv_1.default.config();
mongoose_1.default
    .connect(`${process.env.MONGODB_STRING}`)
    .then(() => console.log("MongoDB Connected ✅"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});
app.use("/categories", category_routes_1.categoriesRouter);
app.listen(port, () => {
    console.log(`Server started at ${port} 🎉`);
});
