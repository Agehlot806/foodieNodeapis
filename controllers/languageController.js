import {Language} from "../models/Languages.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const CreateLanguage = catchAsyncError(async(req,res,next)=> {
const {name,slug,active,isLeft2Right} = req.body;
if(!name||!slug) return next(new ErrorHandler("please add all fields"));
let languages =  await Language.create({
    name,slug,active,isLeft2Right
})
res.status(201).json({
    success:true,
    message:"Language created Successfully",
    languages
})
});

export const editLanguage = catchAsyncError(async (req, res, next) => {
    const {name,slug,active,isLeft2Right} = req.body;
    let languages = await Language.findByIdAndUpdate(req.params.id);
    if (name) languages.name = name;
    if (slug) languages.slug =  slug;
    if (active==true) languages.active = active;
    if (active==false) languages.active = active;
    if (isLeft2Right==true) languages.isLeft2Right = isLeft2Right;
    if (isLeft2Right==false) languages.isLeft2Right = isLeft2Right;
    await languages.save();
    res.status(200).json({
      success: true,
      message: "Languages Updated Successfully",
      languages
    });
  });


  export const deleteLangauge = catchAsyncError(async (req, res, next) => {
    const languages = await Language.findByIdAndDelete(req.params.id);
  
    if (!languages) return next(new ErrorHandler("languages not found", 404));
  
    await languages.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "languages Deleted Successfully",
    });
  });





