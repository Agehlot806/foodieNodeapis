import express from "express";
import {CreateBanner, deleteBanner, editBanner, editBannerImage, getallbanner} from "../controllers/bannerController.js"
// import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/banners/create").post(singleUpload,CreateBanner);
router.route("/banners").get(getallbanner);
router.route("/banners/:id").put(editBanner).delete(deleteBanner);
router.route("/upadatebannerimage/:id").put(singleUpload,editBannerImage);



export default router;