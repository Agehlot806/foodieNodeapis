import {DinIn} from "../models/DineIn.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const CreateDineIn = catchAsyncError(async(req,res,next)=> {
const {dineforcustomer,dineforresturent} =req.body;
if(!dineforresturent||!dineforresturent) return next(new ErrorHandler("please add all fields"));

let dinein = await DinIn.findOne({dineforcustomer});
if(dinein) return next(new ErrorHandler("dine in already exist"))
dinein = await DinIn.create({
  dineforresturent,dineforresturent
})
res.status(201).json({
  success:true,
  message:"dineIn created successfully",
  dinein,
})
});

export const editDineIn = catchAsyncError(async (req, res, next) => {
    const {enableDineInForResturent,enableDineInCustomer} = req.body;
    const dineInenable = await DinIn.findByIdAndUpdate(req.params.id);
    if (enableDineInForResturent==true) dineInenable.enableDineInForResturent = enableDineInForResturent;
    if (enableDineInForResturent==false) dineInenable.enableDineInForResturent = enableDineInForResturent;
    if (enableDineInCustomer==true) dineInenable.enableDineInCustomer =  enableDineInCustomer;
    if (enableDineInCustomer==false) dineInenable.enableDineInCustomer =  enableDineInCustomer;

    await dineInenable.save();
  
    res.status(200).json({
      success: true,
      message: "DineIn Updated Successfully",
      dineInenable
    });
  });


