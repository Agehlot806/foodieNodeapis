import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {Notification} from "../models/Notification.js";
import ApiFeatures from "../utils/apifeatures.js";

export const CreateNotification = catchAsyncError(async(req,res,next)=>{
    const {subject,message,sendTo} = req.body;
    if(!subject||!message)
    return next(new ErrorHandler("Please add all feilds",400));
    let notification =await Notification.findOne({subject})
    if(notification)
    return next(new ErrorHandler("notification already exits",409));
    notification =  await Notification.create({
       subject,message,sendTo
    })
    res.status(201).json({
        success:true,
        message:"notification created Successfully",
    })
})

export const getallNotification = catchAsyncError(async(req,res,next)=> {
    const resultPerPage =3;
    const getallnotificationCount= await Notification.countDocuments();
    const apiFeature = new ApiFeatures(Notification.find(), req.query).search().filter().pagination(resultPerPage)
    let notification = await apiFeature.query;
res.status(200).json({
    success:true,
    message:"getting all the notification",
    notification,getallnotificationCount,resultPerPage
})
});

export const deltenotification = catchAsyncError(async (req, res, next) => {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) return next(new ErrorHandler("notification not found", 404));
    await notification.deleteOne();
    res.status(200).json({
      success: true,
      message: "notification Deleted Successfully",
    });
  });
  

