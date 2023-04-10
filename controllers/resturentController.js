import { Resturent } from "../models/Resturent.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import ApiFeatures from "../utils/apifeatures.js";

export const createResturent = catchAsyncError(async (req, res, next) => {
    const {firstname,lastname,email,password,phone,Rname,Rcategory,Rphone,Raddress,Rlatitude,Rlongitude,RopenTime,RcloseTime,specialOfferddays,Resturentstatus,DineInFeature,OfferopenTime,OffercloseTime,OfferDiscount,OfferDiscount_type ,RServices} = req.body;
    if (!firstname || !lastname || !email ||!password||!phone||!Rname||!Rcategory||!Rphone||!Raddress)
    return next(new ErrorHandler("please add all fields",400));
    let resturent = await Resturent.findOne({email})
    if(resturent)
    return next(new ErrorHandler("resturent already registerd",409));
    let RImage =undefined;
    let avatar = undefined;
    let HumbleImage = undefined;
    let Story_Video = undefined;
    let RGallery = undefined;
    // console.log(req.files['resturentimagefile'][0]);
    if(req.files['resturentimagefile'][0]){
      const file = getDataUri(req.files['resturentimagefile'][0]);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      RImage ={
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
      }
    }
    if(req.files['resturentgalleryfile'][0]){
      const file = getDataUri(req.files['resturentgalleryfile'][0]);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      avatar ={
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
      }
    }
    if(req.files['humblegiffile'][0]){
      const file = getDataUri(req.files['humblegiffile'][0]);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      HumbleImage ={
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
      }
    }
    if(req.files['storyvideofile'][0]){
      const file = getDataUri(req.files['storyvideofile'][0]);
      const mycloud = await cloudinary.v2.uploader.upload(file.content,{
        resource_type:"video",
      });
      Story_Video ={
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
      }
    }
    if(req.files['rgalleryfile'][0]){
      const file = getDataUri(req.files['rgalleryfile'][0]);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
       RGallery={
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
      }
    }
    const resturentobject = {
      firstname,lastname,email,password,phone,Rname,Rcategory,Rphone,Raddress,Rlatitude,Rlongitude,RopenTime,RcloseTime,Resturentstatus,DineInFeature,OfferopenTime,OffercloseTime,OfferDiscount,OfferDiscount_type,RServices,RImage,avatar,specialOfferddays
   ,HumbleImage,
   Story_Video,
   RGallery }
    
    
    resturent = new Resturent(resturentobject);
    await resturent.save()
    res.status(201).json({
      success: true,
      message: "Resturent Register Successfully.",
    });
  });

export const getallresturent = catchAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  const resturentCount = await Resturent.countDocuments();
  const apiFeature = new ApiFeatures(Resturent.find(), req.query).search().filter().pagination(resultPerPage)
  let resturent = await apiFeature.query;
    res.status(200).json({
        success: true,
        message: "getting all the Resturent",
        resturent,resturentCount,resultPerPage
    })
});

export const getresturentbyId = catchAsyncError(async (req, res, next) => {
  const resturent = await Resturent.findById(req.params.id);
  res.status(200).json({
    success: true,
    resturent
  });
});

export const editresturent = catchAsyncError(async (req, res, next) => {
    const { firstname,lastname,email,password,phone,Rname,Rcategory,Rphone,Raddress,Rlatitude,Rlongitude,RopenTime,RcloseTime,Resturentstatus,DineInFeature,OfferopenTime,OffercloseTime,OfferDiscount,OfferDiscount_type,specialOfferddays,RServices} = req.body;
    const resturent = await Resturent.findByIdAndUpdate(req.params.id);
    if (firstname) resturent.firstname = firstname;
    if (lastname) resturent.lastname =  lastname;
    if(password) resturent.password = password;
    if (email) resturent.email = email;
    if (phone) resturent.phone = phone;
    if (Rname) resturent.Rname = Rname;
    if (Rcategory) resturent.Rcategory = Rcategory;
    if (Rphone) resturent.Rphone = Rphone;
    if(Raddress) resturent.Raddress = Raddress;
    if(Rlatitude) resturent.Rlatitude = Rlatitude;
    if(Rlongitude) resturent.Rlongitude = Rlongitude;
    // if(RDescription) resturent.RDescription = RDescription;
    //resturet timing updates
    if(Resturentstatus==true) resturent.Resturentstatus = Resturentstatus;
    if(Resturentstatus==false) resturent.Resturentstatus = Resturentstatus;
    if(DineInFeature==true) resturent.DineInFeature = DineInFeature;
    if(DineInFeature==false) resturent.DineInFeature = DineInFeature;
    // if(offerdayOfWeek) resturent.offerdayOfWeek = offerdayOfWeek;
    if(OfferopenTime) resturent.OfferopenTime = OfferopenTime
    if(OffercloseTime) resturent.OffercloseTime = OffercloseTime;
    if(OfferDiscount) resturent.OfferDiscount = OfferDiscount;
    if(OfferDiscount_type) resturent.OfferDiscount_type = OfferDiscount_type;
    if(RopenTime)resturent.RopenTime= RopenTime;
    if(RcloseTime)resturent.RcloseTime = RcloseTime;
    if(RServices.status==true) resturent.RServices.status = RServices.status;
    if(RServices.status==false) resturent.RServices.status = RServices.status;
    if(specialOfferddays.dayType) resturent.specialOfferddays.dayType = specialOfferddays.dayType;
    if(specialOfferddays.open) resturent.specialOfferddays.open = specialOfferddays.open;
    if(specialOfferddays.close) resturent.specialOfferddays.close = specialOfferddays.close;
    if(specialOfferddays.discount) resturent.specialOfferddays.discount = specialOfferddays.discount;



    await resturent.save();
    res.status(200).json({
      success: true,
      message: "Resturent Updated Successfully",
      resturent
    });
  });

export const updateResturentprofile= catchAsyncError(async (req, res, next) => {
  const resturent = await Resturent.findById(req.params.id);
  if(req.files['resturentimagefile'][0]){
    const file = getDataUri(req.files['resturentimagefile'][0]);
    await cloudinary.v2.uploader.destroy(resturent.RImage.public_id);
    const mycloud = await cloudinary.v2.uploader.upload(file.content);
    resturent.RImage = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }
  if(req.files['resturentgalleryfile'][0]){
    const file = getDataUri(req.files['resturentgalleryfile'][0]);
    await cloudinary.v2.uploader.destroy(resturent.avatar.public_id);
    const mycloud = await cloudinary.v2.uploader.upload(file.content);
    resturent.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }
  if(req.files['humblegiffile'][0]){
    const file = getDataUri(req.files['humblegiffile'][0]);
    await cloudinary.v2.uploader.destroy(resturent.HumbleImage.public_id);
    const mycloud = await cloudinary.v2.uploader.upload(file.content);
    resturent.HumbleImage = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }
  if(req.files['rgalleryfile'][0]){
    const file = getDataUri(req.files['rgalleryfile'][0]);
    await cloudinary.v2.uploader.destroy(resturent.RGallery.public_id);
    const mycloud = await cloudinary.v2.uploader.upload(file.content);
    resturent.RGallery = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }
  if(req.files['storyvideofile'][0]){
    const file = getDataUri(req.files['storyvideofile'][0]);
    await cloudinary.v2.uploader.destroy(resturent.Story_Video.public_id,{
      resource_type:"video"
    });
    const mycloud = await cloudinary.v2.uploader.upload(file.content);
    resturent.Story_Video = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }

  await resturent.save();

  res.status(200).json({
    success: true,
    message: "Resturent Image Updated Successfully",
  });
});

  export const deleteResturent = catchAsyncError(async (req, res, next) => {
  const resturent = await Resturent.findByIdAndDelete(req.params.id);
  if (!resturent) return next(new ErrorHandler("Resturent not found", 404));
  await cloudinary.v2.uploader.destroy(resturent.RImage.public_id);
  await cloudinary.v2.uploader.destroy(resturent.RGallery.public_id);
  await cloudinary.v2.uploader.destroy(resturent.avatar.public_id);
  await cloudinary.v2.uploader.destroy(resturent.Story_Video.public_id,{
    resource_type:"video",
  });
  await cloudinary.v2.uploader.destroy(resturent.HumbleImage.public_id);
  
    await resturent.$isD

  
    res.status(200).json({
      success: true,
      message: "Resturent Deleted Successfully",
    });
  });

  export const getresturentcount = catchAsyncError(async (req, res, next) => {
    const resturent = await Resturent.find({}).countDocuments({});
    res.status(200).json({
        success: true,
        message:`Number of resturent available is ${resturent}`,
        resturent
    })
});
  










