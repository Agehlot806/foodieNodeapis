import express from "express";
import {Createcoupon, deletecoupon, editcoupon, getallcoupons, getcouponbyId} from "../controllers/couponController.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
router.route("/coupons/create").post(singleUpload,Createcoupon);
router.route("/coupons").get(getallcoupons);
router.route("/coupons/:id").get(getcouponbyId);
router.route("/coupons/:id").put(editcoupon).delete(deletecoupon);


export default router;