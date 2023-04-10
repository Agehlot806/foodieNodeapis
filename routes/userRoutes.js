import express from "express";
import passport from "passport";
const router = express.Router();
import { CreateUser, getalluser,edituser,deleteuser , getuserbyId, getallusercount, updateprofilepictureUser} from "../controllers/userController.js"; 
// import { isAuthenticated } from "../middlewares/auth.js";
import {singleUpload} from "../middlewares/multer.js"
router.route("/users/create").post(singleUpload,CreateUser);
router.route("/users").get(getalluser);
router.route("/users/:id").get(getuserbyId)
router.route("/users/edit/:id").put(edituser);
router.route("/users/delete/:id").delete(deleteuser);
router.route("/totalusers").get(getallusercount)
router.route("/updateprofilepicture/:id").put(singleUpload,updateprofilepictureUser);




export default router;
