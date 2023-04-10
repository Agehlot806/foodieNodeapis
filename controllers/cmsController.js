import {Cms} from "../models/CmsFeatures.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/apifeatures.js";
export const createCmsPage = catchAsyncError(async(req,res,next)=> {
    const {pagename,pageslug,pagedescription,status} = req.body;
    if(!pagename||!status)
    return next(new ErrorHandler("Please add all feilds",400));
    let cms =await Cms.findOne({pagename})
    if(cms)
    return next(new ErrorHandler("cms already defined",409))
    cms =  await Cms.create({
          pagename,pageslug,pagedescription,status
    })
    res.status(201).json({
        success:true,
        message:"Cms created Successfully",
        cms
    })
    });

     
 export const editCms = catchAsyncError(async (req, res, next) => {
        const {pagename,pageslug,pagedescription,status} = req.body;
        const cms = await Cms.findByIdAndUpdate(req.params.id);
       if(pagename) cms.pagename = pagename;
       if(pageslug) cms.pageslug = pageslug;
       if(pagedescription) cms.pagedescription = pagedescription;
       if(status==true) cms.status = status;
       if(status==false) cms.status = status;
        await cms.save();
        res.status(200).json({
          success: true,
          message: "cms Updated Successfully",
          cms
        });
      });
      
    
 export const deleteCms = catchAsyncError(async (req, res, next) => {
        const cms = await Cms.findByIdAndDelete(req.params.id);
        if (!cms) return next(new ErrorHandler("cms not found", 404));
        await cms.deleteOne();
        res.status(200).json({
          success: true,
          message: "cms Deleted Successfully",
        });
      });



export const getallcms = catchAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  const getallcmsCount = await Cms.countDocuments();
  const apiFeature = new ApiFeatures(Cms.find(), req.query).search().filter().pagination(resultPerPage)
  let cms = await apiFeature.query;
  // let filteruserCount  = user.length;
  // user = await apiFeature.query;
    // const user = await User.find({});
    res.status(200).json({
        success: true,
        message: "getting all the user",
        cms,resultPerPage,getallcmsCount
    })
});



  


