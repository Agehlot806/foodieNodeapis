import {Driver} from "../models/Driver.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import ApiFeatures from "../utils/apifeatures.js";
// import { Resturent } from "../models/Resturent.js";

export const CreateDriver = catchAsyncError(async(req,res,next)=> {
    const {firstname,lastname,email,password,phone,latitude,longitude,CarNumber,CarName,DriverStatus,DriverAvailable} = req.body;
    if(!firstname||!lastname||!email||!password||!phone||!CarNumber||!CarName)
    return next(new ErrorHandler("Please add all feilds",400));
    let driver =await Driver.findOne({phone});
    if(driver)
    return next(new ErrorHandler("Driver already exits",409));
    let driverAvatar = undefined;
    let CarImage = undefined;
    if(req.files['driverimage'][0]){
      const file = getDataUri(req.files['driverimage'][0]);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      driverAvatar ={
        public_id:mycloud.public_id,
        url:mycloud.secure_url
      }
    }
    if(req.files['drivercar'][0]){
      const file = getDataUri(req.files['drivercar'][0]);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      CarImage ={
        public_id:mycloud.public_id,
        url:mycloud.secure_url
      }
    }
    const driverobject= {
      firstname,lastname,email,password,phone,latitude,longitude,CarNumber,CarName,driverAvatar,CarImage,DriverStatus,DriverAvailable

    }

 driver = new Driver(driverobject);
 await driver.save()
   
    res.status(201).json({
        success:true,
        message:"Driver created Successfully",
        driver,
    })
    });

  

export const getalldriver = catchAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  const driverCount = await Driver.countDocuments();
  const apiFeature = new ApiFeatures(Driver.find(),req.query).search().filter().pagination(resultPerPage);
  let driver = await apiFeature.query;
    res.status(200).json({
        success: true,
        message: "getting all the drivers",
        driver,resultPerPage,driverCount
    })
});

export const getdriverbyId = catchAsyncError(async (req, res, next) => {
  const driver = await Driver.findById(req.params.id);
  res.status(200).json({
    success: true,
    driver    
  });
});

export const editdriver = catchAsyncError(async (req, res, next) => {
  const {firstname,lastname,email,phone,DriverStatus,DriverAvailable,latitude,longitude,CarName,CarNumber} = req.body;
 const driver = await Driver.findByIdAndUpdate(req.params.id);
  if (firstname) driver.firstname = firstname;
  if (lastname) driver.lastname =  lastname;
  if (email) driver.email = email;
  if (phone) driver.phone = phone;
  if (DriverStatus) driver.DriverStatus = DriverStatus;
  if(latitude) driver.latitude = latitude;
  if(longitude) driver.longitude = longitude
  if(CarName) driver.CarName = CarName;
  if(CarNumber) driver.CarNumber = CarNumber;
  if(DriverStatus==true)driver.DriverStatus = DriverStatus;
  if(DriverStatus==false)driver.DriverStatus = DriverStatus;
  if(DriverAvailable==true)driver.DriverAvailable = DriverAvailable
  if(DriverAvailable==false)driver.DriverAvailable = DriverAvailable
  await driver.save();
  res.status(200).json({
    success: true,
    message: "driver Updated Successfully",
    driver
  });
});

export const updatedriverprofile= catchAsyncError(async (req, res, next) => {
    const driver = await Driver.findById(req.params.id);
    if(req.files['driverimage'][0]){
    const file = getDataUri(req.files['driverimage'][0]);
    await cloudinary.v2.uploader.destroy(driver.driverAvatar.public_id);
    const mycloud = await cloudinary.v2.uploader.upload(file.content);
    driver.driverAvatar ={
      public_id:mycloud.public_id,
      url:mycloud.secure_url,
    }
    }
   if(req.files['drivercar'][0]){
      const file = getDataUri(req.files['driverimage'][0]);
      await cloudinary.v2.uploader.destroy(driver.CarImage.public_id);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      driver.CarImage ={
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
      }
      }
    await driver.save();
    res.status(200).json({
      success: true,
      message: "Driver Picture Updated Successfully",
    });
  });


export const deletedriverbyId = catchAsyncError(async (req, res, next) => {
  const driver = await Driver.findByIdAndDelete(req.params.id);
  if (!driver) return next(new ErrorHandler("Driver not found", 404));
  await cloudinary.v2.uploader.destroy(driver.driverAvatar.public_id);
  await cloudinary.v2.uploader.destroy(driver.CarImage.public_id);
  await driver.deleteOne();
  res.status(200).json({
    success: true,
    message: "Driver Deleted Successfully",
  });
});


export const getalldriverCount = catchAsyncError(async (req, res, next) => {
  const driver = await Driver.find({}).countDocuments({});
  res.status(200).json({
      success: true,
      message:`Number of Driver registered is ${driver}`,
      driver
  })
});
    





