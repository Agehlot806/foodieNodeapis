import express from "express";
import {CreateFoodAttrubute, editfoodAttribute,deleteFoodAttrubute, getallFoodAttribute} from "../controllers/attrubutesController.js"
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/createfoodAttrubute").post(CreateFoodAttrubute);
router.route("/attributes/:id").put(isAuthenticated,editfoodAttribute).delete(isAuthenticated,deleteFoodAttrubute)
router.route("/attributes/allattributes").get(getallFoodAttribute);




export default router;