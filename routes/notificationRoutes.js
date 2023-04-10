import express from "express";
import { CreateNotification,deltenotification,getallNotification } from "../controllers/notificationController.js";
const router = express.Router();
router.route("/notification/create").post(CreateNotification);
router.route("/notifications").get(getallNotification);
router.route("/notification/:id").delete(deltenotification);

export default router;
