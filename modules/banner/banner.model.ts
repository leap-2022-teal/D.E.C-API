import { ObjectId, Schema, model } from "mongoose";
interface Banner {
  name: string;
  image?: {  };
  details: string;
  link: string;
  categoryId? : string;

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
  categoryId: { type: String, ref: "category.categoryId" },

});
export const Banner = model("Banner", BannerSchema);
