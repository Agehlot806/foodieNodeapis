import {RadiusConfiguration} from "../models/RadiusConfiguration.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createRadiusconfiguration =catchAsyncError(async(req,res,next)=>{
const {ResturentNearbyRadius} = req.body;
let resturentradius = await RadiusConfiguration.findOne({ResturentNearbyRadius});
resturentradius = await RadiusConfiguration.create({
    ResturentNearbyRadius
})
res.status(201).json({
    success:true,
    messsage:"resturentradius set successfully", 
    resturentradius
})
});



export const editRadiusConfiguration = catchAsyncError(async (req, res, next) => {
    const {ResturentNearbyRadius} = req.body;
    const resturentradius = await RadiusConfiguration.findByIdAndUpdate(req.params.id);
    if (ResturentNearbyRadius) resturentradius.ResturentNearbyRadius = ResturentNearbyRadius;
    await resturentradius.save();
    res.status(200).json({
      success: true,
      message: "resturentRadius Updated Successfully",
      resturentradius,
    });
  });

