import express from "express";
import { config} from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
const app = express();
config({
    path:"./config/config.env"
})

//using middlewares
app.use(express.json());


app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());


//importing routes
import user from "./routes/userRoutes.js";
import resturent from "./routes/resturentRoutes.js";
import driver from "./routes/driverRoutes.js";
import categories from "./routes/categoriesRoutes.js";
import food  from "./routes/foodRoutes.js";
import admin from "./routes/adminRoutes.js";
import foodattribute from "./routes/attributeRoutes.js";
import foodattributeReview from "./routes/reviewAttributeRoute.js"
import coupon from "./routes/couponsRoutes.js";
import resturentPayout from "./routes/resturentpayoutRoutes.js";
import driverPayout from "./routes/driverPayoutRouter.js";
import banner from "./routes/bannerRouter.js"
import cms from "./routes/cmsRoutes.js"
import setting from "./routes/settingRoutes.js";
import notification from "./routes/notificationRoutes.js";


app.use("/api/v1", user);
app.use("/api/v1",resturent);
app.use("/api/v1",driver);
app.use("/api/v1",categories);
app.use("/api/v1",food);
app.use("/api/v1",admin);
app.use("/api/v1",foodattribute);
app.use("/api/v1",foodattributeReview);
app.use("/api/v1",coupon);
app.use("/api/v1",resturentPayout);
app.use("/api/v1",driverPayout);
app.use("/api/v1",banner);
app.use("/api/v1",cms);
app.use("/api/v1",setting);
app.use("/api/v1",notification);


export default app;
app.use(ErrorMiddleware);
