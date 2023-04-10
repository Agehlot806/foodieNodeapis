import {Setting} from "../models/Setting.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/ErrorHandler.js";
export const CreateGlobalSetting = catchAsyncError(async(req,res,next)=> {
const {Globalsetting,contactUs,storyLength,version} = req.body;
let globalsetting =await Setting.findOne({})
if(globalsetting)
return next(new ErrorHandler("setting already exits",409));
    let applicationLogo = undefined;
    let defaultPlaceholderImage = undefined;
    let ApplicationFavIconImage = undefined;
    console.log(req.files['applicationlogofile'][0])
    if(req.files['applicationlogofile'][0]){
      const file = getDataUri(req.files['applicationlogofile'][0]);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      applicationLogo ={
        public_id:mycloud.public_id,
        url:mycloud.secure_url
      }
    }
    if(req.files['placeholderfile'][0]){
      const file = getDataUri(req.files['placeholderfile'][0]);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      defaultPlaceholderImage ={
        public_id:mycloud.public_id,
        url:mycloud.secure_url
      }
    }

    if(req.files['faviconimagefile'][0]){
        const file = getDataUri(req.files['faviconimagefile'][0]);
        const mycloud = await cloudinary.v2.uploader.upload(file.content);
        ApplicationFavIconImage ={
          public_id:mycloud.public_id,
          url:mycloud.secure_url
        }
      }
    globalsetting =  await Setting.create({
        Globalsetting,contactUs,storyLength,version,ApplicationFavIconImage,defaultPlaceholderImage,applicationLogo
        },
       )
    res.status(201).json({
        success:true,
        message:"Global Setting  created Successfully",
        globalsetting
    })
    });

export const EditGlobalSetting = catchAsyncError(async(req,res,next)=> {
    const {Globalsetting,contactUs,storyLength,version} = req.body;
   let settings = await Setting.findById(req.params.id);
    if(Globalsetting) settings.Globalsetting = Globalsetting;
    if(contactUs) settings.contactUs = contactUs;
    if(storyLength) settings.storyLength = storyLength;
    if(version) settings.version  = version;
    await settings.save();
    res.status(200).json({
        success:true,
        message:"setting updated",
        settings
    }) 
})

export const updateglobalSettingimage= catchAsyncError(async (req, res, next) => {
    const globalsetting  = await Setting.findById(req.params.id);
    if(req.files['applicationlogofile'][0]){
      const file = getDataUri(req.files['applicationlogofile'][0]);
      await cloudinary.v2.uploader.destroy(globalsetting.applicationLogo.public_id);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      globalsetting.applicationLogo = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
    if(req.files['faviconimagefile'][0]){
      const file = getDataUri(req.files['faviconimagefile'][0]);
      await cloudinary.v2.uploader.destroy(globalsetting.ApplicationFavIconImage.public_id);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      globalsetting.ApplicationFavIconImage = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
    if(req.files['placeholderfile'][0]){
      const file = getDataUri(req.files['placeholderfile'][0]);
      await cloudinary.v2.uploader.destroy(globalsetting.defaultPlaceholderImage.public_id);
      const mycloud = await cloudinary.v2.uploader.upload(file.content);
      globalsetting.defaultPlaceholderImage = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
    
    await globalsetting.save();
  
    res.status(200).json({
      success: true,
      message: "globalsetting Images Updated Successfully",
    });
  });






