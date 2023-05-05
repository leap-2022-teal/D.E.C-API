import { ObjectId, Schema, model } from "mongoose";
interface Banner {
  name: string;
  image?: {};
  details: string;
  link: string;
  categoryId?: ObjectId;
  position?: string;
}
const BannerSchema = new Schema<Banner>({
  name: { type: String },
  image: {
    path: { type: String, default: "" },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  details: { type: String },
  link: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: "category.categoryId" },
  position: { type: String },
});
export const Banner = model("Banner", BannerSchema);
