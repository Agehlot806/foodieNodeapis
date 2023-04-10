import {ResturentPayout} from "../models/ResturentPayout.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {Resturent} from "../models/Resturent.js"
import ApiFeatures from "../utils/apifeatures.js";

export const createResturentPayouts= catchAsyncError(async(req,res,next)=> {
    const {amount,note,ResturentId} = req.body;
    if(!amount||!note||!ResturentId) return next(new ErrorHandler("please add all fields"))
    const resturentpayoutObject ={
        amount,note,resturent:ResturentId
    }
 const resturentpayout = new ResturentPayout(resturentpayoutObject);
 await resturentpayout.save()
    res.status(201).json({
        success:true,
        message:"Resturent payout created Successfully",
        resturentpayout,
    
    })
    });

    export const getallresturentpayout= catchAsyncError(async (req, res, next) => {
        const resultPerPage =3;
        const getallresturentpayoutCount= await ResturentPayout.countDocuments();
        const apiFeature = new ApiFeatures(ResturentPayout.find(), req.query).search().filter().pagination(resultPerPage)
        let resturentpayout = await apiFeature.query;
        // let filteruserCount  = user.length;
        // user = await apiFeature.query;
          // const user = await User.find({});
          res.status(200).json({
              success: true,
              message: "getting all the resturent payout",
            resultPerPage,getallresturentpayoutCount,resturentpayout
          })
      });
      






    
