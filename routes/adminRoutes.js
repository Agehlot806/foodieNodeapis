import express from "express";
import {registeradmin,login,logout,getMyProfile, updateProfile,updatePassword,forgetPassword,resetPassword, testapi} from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.route("/registeradmin").post(registeradmin);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/myprofile").get(isAuthenticated,getMyProfile);
router.route("/updateadminpassword").put(isAuthenticated,updatePassword);
router.route("/updateadminprofile").put(isAuthenticated,updateProfile);
router.route("/forgetpassword").post(forgetPassword);
router.route("/testapi").get(testapi);

// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);


export default router;