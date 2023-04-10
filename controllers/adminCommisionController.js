import { AdminCommission } from "../models/AdminCommision.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
export const createAdminCommision = catchAsyncError(async(req,res,next)=> {
    const {commisionType,adminCommision,enableAdminCommision}  = req.body;
    if(!commisionType||!adminCommision)
    return next(new ErrorHandler("please add all fields"));
  let  admincommission =await AdminCommission.create({
        commisionType,adminCommision,enableAdminCommision
    });
    res.status(201).json({
        success:true,
        message:"admin commision created succesfully",
        admincommission,

    })
})

export const editAdminCommission  = catchAsyncError(async(req,res,next)=>{
    const {commisionType,adminCommision,enableAdminCommision}  = req.body;
    const admincommission = await AdminCommission.findByIdAndUpdate(req.params.id);
    if (commisionType) admincommission.commisionType = commisionType;
    if (adminCommision) admincommission.adminCommision =  adminCommision;
    if (enableAdminCommision==true) admincommission.enableAdminCommision = enableAdminCommision;
    if (enableAdminCommision==false) admincommission.enableAdminCommision = enableAdminCommision;
    await admincommission.save();
  
    res.status(200).json({
      success: true,
      message: "admission comission Updated Successfully",
      admincommission
    });

})



