import express from "express";
const router = express.Router();
import { resturentupload } from "../middlewares/multer.js";
import { createResturent,getallresturent,getresturentbyId,editresturent,deleteResturent,getresturentcount,updateResturentprofile } from "../controllers/ResturentController.js";

router.route("/resturents/create").post(resturentupload,createResturent);
router.route("/resturents").get(getallresturent);
router.route("/resturents/:id").get(getresturentbyId);
router.route("/resturents/edit/:id").put(editresturent);
router.route("/resturents/delete/:id").delete(deleteResturent);
router.route("/totalresturents").get(getresturentcount);
router.route("/updatedriverprofile/:id").put(resturentupload,updateResturentprofile);



export default router;
