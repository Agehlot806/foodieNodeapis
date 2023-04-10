import express from "express";
import {CreateReviewFoodAttrubute,editReviewfoodAttribute,deleteFoodAttrubuteReview,getallFoodAttributeReview} from "../controllers/reviewAttributeController.js"
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/reviewattributes/create").post(CreateReviewFoodAttrubute);
router.route("/allreviewfoodattribute").get(getallFoodAttributeReview);
router.route("/reviewattributes/:id").put(isAuthenticated,editReviewfoodAttribute).delete(isAuthenticated,deleteFoodAttrubuteReview)

export default router;