import {DriverPayout} from "../models/DriverPayout.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { Driver } from "../models/Driver.js";
import ApiFeatures from "../utils/apifeatures.js";

export const CreatedriverPayout = catchAsyncError(async(req,res,next)=> {
    const {amount,note,driverid} = req.body;
    if(!amount||!note)
    return next(new ErrorHandler("Please add all feilds",400));
    let driverPayout =await DriverPayout.findOne({note})
    if(driverPayout)
    return next(new ErrorHandler("DriverPayout already exits",409));
    driverPayout=  await DriverPayout.create({
       amount,note,driverid
    })
    res.status(201).json({
        success:true,
        message:"DriverPayout created Successfully",
        driverid,
        driverPayout,
    })
    });

    export const getalldriverPayout = catchAsyncError(async (req, res, next) => {
      const resultPerPage =3;
      const driverPayoutCount  = await DriverPayout.countDocuments();
      const apiFeature = new ApiFeatures(DriverPayout.find(), req.query).search().filter().pagination(resultPerPage)
      let driverpayout = await apiFeature.query;
      // let filteruserCount  = user.length;
      // user = await apiFeature.query;
        // const user = await User.find({});
        res.status(200).json({
            success: true,
            message: "getting all the user",
            resultPerPage,driverpayout,driverPayoutCount
        })
    });


