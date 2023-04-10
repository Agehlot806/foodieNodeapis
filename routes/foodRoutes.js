import express from "express";
import {CreateFood, deletefood, editfoodDetails, getallfood, getallfoodCount, getfoodbyId, updatefoodImage} from "../controllers/foodController.js"
import { foodupload } from "../middlewares/multer.js";
// import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
router.route("/food/createfood").post(foodupload,CreateFood);
router.route("/food/getallfood").get(getallfood);
router.route("/food/:id").get(getfoodbyId);
router.route("/food/:id").put(editfoodDetails).delete(deletefood);
router.route("/allfoodcount").get(getallfoodCount);
router.route("/updatefoodimage/:id").put(foodupload,updatefoodImage);


export default router;