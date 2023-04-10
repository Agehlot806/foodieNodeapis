import express from "express";
import { createCurrency, deletecurrency, editcurrency, getallcurrency } from "../controllers/currencyController.js";
import {CreateGlobalSetting, EditGlobalSetting, updateglobalSettingimage} from "../controllers/settingController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {PaymentMethodInfoandEdit, PaymentMethodInfocreate} from "../controllers/paymentMethodsController.js"
import { createAdminCommision, editAdminCommission } from "../controllers/adminCommisionController.js";
import { createRadiusconfiguration, editRadiusConfiguration } from "../controllers/radiusconfigurationController.js";
import { CreateDineIn, editDineIn } from "../controllers/dineInController.js";
import { CreateTaxSetting, EditTaxInfo } from "../controllers/taxSettingController.js";
import { CreateDeliveryCharges, editDeliveryCharges } from "../controllers/deliveryChargeController.js";
import { CreateLanguage, deleteLangauge, editLanguage } from "../controllers/languageController.js";
import { CreateSpecialOffer, EditspecialOffer } from "../controllers/specialofferController.js";
import { globalsettingupload } from "../middlewares/multer.js";
const router = express.Router();
//global setting routes 
router.route("/settings/app/globals").post(globalsettingupload,CreateGlobalSetting);
router.route("/settings/app/globals/:id").put(EditGlobalSetting);
router.route("/updatasettingimages/:id").put(updateglobalSettingimage);

//currency routes 
router.route("/settings/currencies/create").post(createCurrency);
router.route("/settings/currencies/:id").put(editcurrency).delete(deletecurrency);
router.route("/settings/currencies").get(getallcurrency);

//paymentmethod routes 
router.route("/settings/payment/create").post(PaymentMethodInfocreate);
router.route("/settings/payment/edit/:id").put(PaymentMethodInfoandEdit);

//admin commision
router.route("/settings/app/adminCommission").post(createAdminCommision);
router.route("/settings/app/adminCommission/:id").put(editAdminCommission);

//Radiusconfiguration routes 
router.route("/settings/app/radiusConfiguration").post(createRadiusconfiguration);
router.route("/settings/app/radiusConfiguration/:id").put(editRadiusConfiguration);

//Dine in for resturent and customer active inactive routes 
router.route("/settings/app/bookTable").post(CreateDineIn);
router.route("/settings/app/bookTable/:id").put(editDineIn);

//Tax routes 
router.route("/settings/app/vatSetting").post(CreateTaxSetting);
router.route("/settings/app/vatSetting/:id").put(EditTaxInfo);

//Delivery Charges

router.route("/settings/app/deliveryCharge").post(CreateDeliveryCharges);
router.route("/settings/app/deliveryCharge/:id").put(editDeliveryCharges);

//Languages Routes 
router.route("/settings/app/languages/create").post(CreateLanguage);
router.route("/settings/app/languages/:id").put(editLanguage).delete(isAuthenticated,deleteLangauge)

//special offer routes 
// router.route("/settings/app/specialOffer").post(CreateSpecialOffer)
router.route("/settings/app/specialOffer/:id").put(EditspecialOffer);


export default router;