import express from "express";
import {createCmsPage, deleteCms, editCms, getallcms} from "../controllers/cmsController.js"
const router=  express.Router();


router.route("/cms/create").post(createCmsPage);
router.route("/cms/:id").put(editCms).delete(deleteCms);
router.route("/allcms").get(getallcms);

export default router;