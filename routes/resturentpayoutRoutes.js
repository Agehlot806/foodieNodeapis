import express from "express";
import {createResturentPayouts, getallresturentpayout} from "../controllers/resturentPayoutController.js"
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.route("/restaurantsPayouts/create").post(createResturentPayouts);
router.route("/getallresturentpayout").get(getallresturentpayout);
export default router;
