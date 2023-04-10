import {Tax} from "../models/Tax.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
// import ErrorHandler from "../utils/ErrorHandler.js";

export const CreateTaxSetting = catchAsyncError(async(req,res,next)=> {
const {label,tax,type,Isenabled} = req.body;
let taxx =  await Tax.create({
    label,tax,type,Isenabled
})
res.status(201).json({
    success:true,
    message:"tax created Successfully",
    taxx
})
});

export const EditTaxInfo = catchAsyncError(async (req, res, next) => {
    const {label,tax,type,Isenabled} = req.body;
    const taxx = await Tax.findById(req.params.id);
    if (label) taxx.label = label;
    if (tax) taxx.tax =  tax;
    if (type) taxx.type = type;
    if (Isenabled==true) taxx.Isenabled = Isenabled; 
    if(Isenabled==false) taxx.Isenabled =Isenabled;
    await taxx.save();
  
    res.status(200).json({
      success: true,
      message: "Tax info  Updated Successfully",
      taxx
    });
  });

