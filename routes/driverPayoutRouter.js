import express from "express";
import {CreatedriverPayout, getalldriverPayout} from "../controllers/driverPayoutController.js"
const router = express.Router();

router.route("/driversPayouts/create").post(CreatedriverPayout);
router.route("/driversPayouts").get(getalldriverPayout);



export default router;