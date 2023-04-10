import  {Banner} from "../models/Banner.js";
// import {Food} from "../models/Food.js";
import {Resturent} from "../models/Resturent.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import ApiFeatures from "../utils/apifeatures.js";
  
export const CreateBanner = catchAsyncError(async(req,res,next)=> {
    const {title,setorder,bannerposition,ispublish,vendorid,productid,externallinkid} = req.body;
    // const resturent = await Resturent.findById(resturentId); 
    if(!title||!setorder||!bannerposition)
    return next(new ErrorHandler("Please add all feilds",400));
    let photo = undefined;
    if(req.file){
      const file  = getDataUri(req.file);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      photo = { 
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
      }
    }
    const bannerobject = {
      title:title,
      setorder:setorder,
      bannerposition:bannerposition,
      ispublish:ispublish,
      bannerdetails:[ 
      {
        vendor:vendorid,
            
        product:productid,
        
        externallink:externallinkid     
    }
],
      photo
    }
    const banner = new Banner(bannerobject);
    await banner.save();
    res.status(201).json({
        success:true,
        message:"Banner created Successfully",
       banner,
    })
    });

    export const getallbanner = catchAsyncError(async (req, res, next) => {
      const resultPerPage =3;
      const getallbannerCount = await Banner.countDocuments();
      const apiFeature = new ApiFeatures(Banner.find(), req.query).search().filter().pagination(resultPerPage)
      let banner = await apiFeature.query;
    
      res.status(200).json({
          success: true,
          message: "getting all the banner",
          banner,getallbannerCount,resultPerPage
      })
  });

export const deleteBanner = catchAsyncError(async (req, res, next) => {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) return next(new ErrorHandler("Banner not found", 404));
        await cloudinary.v2.uploader.destroy(banner.photo.public_id);
        await banner.deleteOne();
        res.status(200).json({
          success: true,
          message: "banner Deleted Successfully",
        });
      });


export const editBanner = catchAsyncError(async (req, res, next) => {
        const {title,setorder,bannerposition} = req.body;
        const banner = await Banner.findByIdAndUpdate(req.params.id);
        if (title) banner.title = title;
        if (setorder) banner.setorder =  setorder;
        if (bannerposition) banner.bannerposition = bannerposition;
        await banner.save();
        res.status(200).json({
          success: true,
          message: "banner Updated Successfully",
          banner
        });
      });


      export const editBannerImage = catchAsyncError(async (req, res, next) => {
        const banner = await Banner.findById(req.params.id);
        const file =getDataUri(req.file);
        await cloudinary.v2.uploader.destroy(banner.photo.public_id);
        const mycloud = await cloudinary.v2.uploader.upload(file.content);
        banner.photo ={
          public_id:mycloud.public_id,
          url:mycloud.secure_url,
        }
        await banner.save();
        res.status(200).json({
          success: true,
          message: "banner Picture Updated Successfully",
        });
      });



      