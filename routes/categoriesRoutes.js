import express from  "express";
import {createCategories, deletecategorybyId, editcategory, getallcategories, getcategoriesById, updatedcategoryprofile,getallcategoryCount} from "../controllers/categoriesController.js"
const router = express.Router();
import { categoryupload } from "../middlewares/multer.js";
router.route("/categories/create").post(categoryupload,createCategories);
router.route("/categories").get(getallcategories);
router.route("/categories/:id").get(getcategoriesById);
router.route("/categories/edit/:id").put(editcategory);
router.route("/categories/delete/:id").delete(deletecategorybyId);
router.route("/updatecategoryprofile/:id").put(categoryupload,updatedcategoryprofile)
router.route("/totalcategories").get(getallcategoryCount);


export default router;