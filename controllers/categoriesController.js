  import {Categories} from "../models/Categories.js";
  import { catchAsyncError } from "../middlewares/catchAsyncError.js";
  import ErrorHandler from "../utils/ErrorHandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import ApiFeatures from "../utils/apifeatures.js";


  export const createCategories = catchAsyncError(async(req,res,next)=> {
      const {name,description,publish,showInHomePage,foodquality,politebehaviour,flavoursoffood,textureoffood,hygenicfood} = req.body;
      if(!name||!description)
      return next(new ErrorHandler("Please add all feilds",400));
      let categories =await Categories.findOne({name})
      if(categories)
      return next(new ErrorHandler("Categories already defined",409));
      let categoryImage = undefined;
      if(req.file){
        const categoryImagefile = getDataUri(req.file);
        const mycloud = await cloudinary.v2.uploader.upload(categoryImagefile.content);
        categoryImage = {
          public_id:mycloud.public_id,
          url:mycloud.secure_url,
        }
      }
      const categoryObject = {
        name,description,publish,showInHomePage,
        categoryImage,
        
      
              foodquality,
              politebehaviour,
              flavoursoffood,
              textureoffood,
              hygenicfood,
  

      }
     
      categories = new Categories(categoryObject);
      await categories.save()
      res.status(201).json({
          success:true,
          message:"Categories created Successfully",
          categories
      })
      });

     
    export const getallcategories = catchAsyncError(async (req, res, next) => {
      const resultPerPage = 3;
      const categoriesCount = await Categories.countDocuments();
      const apiFeature = new ApiFeatures(Categories.find(), req.query).search().filter().pagination(resultPerPage);
      let categories = await apiFeature.query;
        res.status(200).json({
            success: true,
            message: "getting all the Categories",
            categories,categoriesCount,resultPerPage
        })
    });
    
    export const getcategoriesById = catchAsyncError(async (req, res, next) => {
      const categories = await Categories.findById(req.params.id);
      res.status(200).json({
        success: true,
        categories    
      });
    });
    
    export const editcategory = catchAsyncError(async (req, res, next) => {
      const {name,description,publish,showInHomePage,foodquality,flavoursoffood,textureoffood,hygenicfood,politebehaviour} = req.body;
      const categories = await Categories.findByIdAndUpdate(req.params.id);
     if(name) categories.name = name;
     if(description) categories.description = description;
     if(publish==true)categories.publish = publish;
     if(publish==false)categories.publish = publish;
     if(showInHomePage==true) categories.showInHomePage = showInHomePage;
     if(showInHomePage==false) categories.showInHomePage = showInHomePage;
    if(foodquality==true) categories.foodquality = foodquality
    if(foodquality==false) categories.foodquality = foodquality
    if(politebehaviour==true) categories.politebehaviour =politebehaviour;
    if(politebehaviour==false) categories.politebehaviour =politebehaviour
     if(flavoursoffood==true) categories.flavoursoffood = flavoursoffood;
     if(flavoursoffood==false) categories.flavoursoffood = flavoursoffood;
     if(textureoffood==true) categories.textureoffood  = textureoffood;
     if(textureoffood==false) categories.textureoffood  = textureoffood;
     if(hygenicfood==true) categories.hygenicfood = hygenicfood;
     if(hygenicfood==false) categories.hygenicfood = hygenicfood;
      await categories.save();
      res.status(200).json({
        success: true,
        message: "categories Updated Successfully",
        categories
      });
    });
    
    export const updatedcategoryprofile = catchAsyncError(async (req, res, next) => {
      const categories = await Categories.findById(req.params.id);
      const categoryImagefile =getDataUri(req.file);
      await cloudinary.v2.uploader.destroy(categories.categoryImage.public_id);
      const mycloud = await cloudinary.v2.uploader.upload(categoryImagefile.content);
      categories.categoryImage = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
      await categories.save();
      res.status(200).json({
        success: true,
        message: "category Image Updated Successfully",
      });
    });
    
    export const deletecategorybyId = catchAsyncError(async (req, res, next) => {
      const categories = await Categories.findByIdAndDelete(req.params.id);
      if (!categories) return next(new ErrorHandler("category not found", 404));
      await cloudinary.v2.uploader.destroy(categories.categoryImage.public_id);
      await categories.deleteOne();
      res.status(200).json({
        success: true,
        message: "category Deleted Successfully",
      });
    });
    
    
    export const getallcategoryCount = catchAsyncError(async (req, res, next) => {
      const categories = await Categories.find({}).countDocuments({});
      res.status(200).json({
          success: true,
          message:`Number of Categories registered is ${categories}`,
          categories
      })
    });
       


