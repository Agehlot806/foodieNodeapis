import { User } from "../models/User.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { Admin } from "../models/Admin.js";
import ApiFeatures from "../utils/apifeatures.js";

export const CreateUser = catchAsyncError(async(req,res,next)=> {
const {firstname,lastname,email,password,phone, address1,address2,
    city,country,postalcode,latitude,longitude,userstatus} = req.body;
if(!firstname||!lastname||!email||!password||!phone)
return next(new ErrorHandler("Please add all feilds",400));
let user =await User.findOne({email})
if(user)
return next(new ErrorHandler("User already exits",409));
let avatar = undefined;
if(req.file){
 const file = getDataUri(req.file);
  const mycloud = await cloudinary.v2.uploader.upload(file.content);
  avatar ={
    public_id:mycloud.public_id,
    url:mycloud.secure_url,
  }
}
user =  await User.create({
        firstname,lastname,email,password,phone,avatar,
    address1,address2,city,country,postalcode,latitude,longitude,userstatus
})
res.status(201).json({
    success:true,
    message:"User created Successfully",
    user
})
});


export const getalluser = catchAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  const userCount = await User.countDocuments();
  const apiFeature = new ApiFeatures(User.find(), req.query).search().filter().pagination(resultPerPage)
  let user = await apiFeature.query;
  // let filteruserCount  = user.length;
  // user = await apiFeature.query;
    // const user = await User.find({});
    res.status(200).json({
        success: true,
        message: "getting all the user",
        user,resultPerPage,userCount
    })
});

export const getuserbyId = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const edituser = catchAsyncError(async (req, res, next) => {
  const {firstname,lastname,email,phone,userstatus,address1,address2,city,country,postalcode,latitude,longitude } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id);
  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname =  lastname;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (userstatus) user.userstatus = userstatus;
  if (address1) user.address1 = address1;
  if(address2) user.address2 = address2;
  if(city) user.city = city;
  if(country) user.country = country;
  if(postalcode) user.postalcode = postalcode;
  if(latitude) user.latitude = latitude;
  if(longitude) user.longitude = longitude;
  if(userstatus==true) user.userstatus = userstatus;
  if(userstatus==false) user.userstatus = userstatus;
  await user.save();
  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    user,
  });
});

export const updateprofilepictureUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const file =getDataUri(req.file);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  const mycloud = await cloudinary.v2.uploader.upload(file.content);
  user.avatar ={
    public_id:mycloud.public_id,
    url:mycloud.secure_url,
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

export const deleteuser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});


export const getallusercount = catchAsyncError(async (req, res, next) => {
  const user = await User.find({}).countDocuments({});
  res.status(200).json({
      success: true,
      message:`Number of User registered is ${user}`,
      user
  })
});






