import { Coupons } from "../models/Coupons.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
// import { Resturent } from "../models/Resturent.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import ApiFeatures from "../utils/apifeatures.js";

export const Createcoupon = catchAsyncError(async(req,res,next)=> {
// let resturent = await Resturent.find({},'Rname');
const {code,discountType,discount,expiresAt,description,ResturentId,enable}  = req.body;
if(!code||!discount)
return next(new ErrorHandler("Please add all feilds",400));
let coupon =await Coupons.findOne({code})
if(coupon)
return next(new ErrorHandler("coupon already exits",409));
let couponImage = undefined;
if(req.file){
 const file = getDataUri(req.file);
 const mycloud = await cloudinary.v2.uploader.upload(file.content);
 couponImage ={
  public_id:mycloud.public_id,
  url:mycloud.secure_url,
 }
}
coupon =  await Coupons.create({
    code,discountType,discount,expiresAt,description,resturent:ResturentId,couponImage,enable
})

res.status(201).json({
    success:true,
    message:"coupon created Successfully",
    coupon,
})
});


export const getallcoupons = catchAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  const getallcouponCount= await Coupons.countDocuments();
  const apiFeature = new ApiFeatures(Coupons.find(), req.query).search().filter().pagination(resultPerPage)
  let coupon = await apiFeature.query;

    res.status(200).json({
        success: true,
        message: "getting all the coupons",
        coupon,getallcouponCount,resultPerPage
    })
});

export const getcouponbyId = catchAsyncError(async (req, res, next) => {
  const coupon = await Coupons.findById(req.params.id);
  res.status(200).json({
    success: true,
    coupon
  });
});

export const editcoupon = catchAsyncError(async (req, res, next) => {
  const {code,discountType,discount,expiresAt,Resturent,description,enable} = req.body;
  const coupon = await Coupons.findByIdAndUpdate(req.params.id);
  if (code) coupon.code = code;
  if (discount) coupon.discount =  discount;
  if (discountType) coupon.discountType = discountType;
  if (expiresAt) coupon.expiresAt = expiresAt;
  if (Resturent) coupon.Resturent = Resturent;
  if (description) coupon.description = description;
  if(enable==true) coupon.enable  = enable;
  if(enable==false) coupon.enable  = enable;

  await coupon.save();
  res.status(200).json({
    success: true,
    message: "coupon Updated Successfully",
   coupon
  });
});

export const updatecouponImage = catchAsyncError(async (req, res, next) => {
  // const file = req.file;
  const coupon = await Coupons.findById(req.coupon._id);
  // const fileUri = getDataUri(file);
  // const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  // await cloudinary.v2.uploader.destroy(user.avatar.public_id);
//   coupon.couponImage = {
//     public_id: mycloud.public_id,
//     url: mycloud.secure_url,
//   };
  await coupon.save();
  res.status(200).json({
    success: true,
    message: "CouponImage Updated Successfully",
  });
});

export const deletecoupon = catchAsyncError(async (req, res, next) => {
  const coupon = await Coupons.findByIdAndDelete(req.params.id);

  if (!coupon) return next(new ErrorHandler("coupon not found", 404));

  await coupon.deleteOne();

  res.status(200).json({
    success: true,
    message: "coupon Deleted Successfully",
  });
});