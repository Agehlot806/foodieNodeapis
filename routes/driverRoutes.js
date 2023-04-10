import express from "express";
import { CreateDriver, deletedriverbyId, editdriver, getalldriver, getalldriverCount, getdriverbyId, updatedriverprofile } from "../controllers/driverController.js";
import { driveravatarupload } from "../middlewares/multer.js";

const router = express.Router();
router.route("/drivers/create").post(driveravatarupload,CreateDriver);
router.route("/drivers").get(getalldriver);
router.route("/drivers/:id").get(getdriverbyId);
router.route("/drivers/delete/:id").delete(deletedriverbyId);
router.route("/drivers/edit/:id").put(editdriver);
router.route("/totaldrivers").get(getalldriverCount);
router.route("/updatedriverpicture/:id").put(driveravatarupload,updatedriverprofile);
export default router;