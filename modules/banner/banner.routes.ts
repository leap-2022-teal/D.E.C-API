import { Router } from "express";
import { createNewBanner, deleteBannerById, getBanner, getBannerById, updateBannerById } from "./banner.controller";

const router = Router();
router.get("/", getBanner);
router.get("/:id", getBannerById);
router.post("/:id", createNewBanner);
router.delete("/:id", deleteBannerById);
router.put("/:id", updateBannerById);

export const bannerRouter = router;
