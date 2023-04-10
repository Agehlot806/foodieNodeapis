import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {SpecialOffer} from "../models/SpecialOffer.js"

export const CreateSpecialOffer = catchAsyncError(async(req,res,next)=> {
  const {enableSpecialOffer} = req.body;
  if(!enableSpecialOffer) return next(new ErrorHandler("please add special offer"));
  let specialoffer =await SpecialOffer.findOne({enableSpecialOffer})
 
  specialoffer =  await SpecialOffer.create({
        enableSpecialOffer
  })
  res.status(201).json({
      success:true,
      message:"special offer created Successfully",
      enableSpecialOffer
  })
  });


  export const EditspecialOffer = catchAsyncError(async (req, res, next) => {
    const {enableSpecialOffer} = req.body;
    const specialoffer = await SpecialOffer.findById(req.params.id);
    if (enableSpecialOffer==true) specialoffer.enableSpecialOffer =enableSpecialOffer;
    if(enableSpecialOffer==false) specialoffer.enableSpecialOffer =enableSpecialOffer;
    await specialoffer.save();
    res.status(200).json({
      success: true,
      message: "special offer Updated Successfully",
      specialoffer,
    });
  });
  