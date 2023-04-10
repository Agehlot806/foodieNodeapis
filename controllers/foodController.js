import {Food} from "../models/Food.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import ApiFeatures from "../utils/apifeatures.js";

export const CreateFood = catchAsyncError(async(req,res,next)=> {
const {name,price,discoutPrice,ItemQunatity,description,Ingredients,Addons,FoodSpecification,resturentId,categoryId,foodattributeId,publish,nonveg,takeawayoption} = req.body;
if(!name||!price)
return next(new ErrorHandler("Please add all feilds",400));
let FoodImage = undefined;
if(req.file){
 const file = getDataUri(req.file);
  const mycloud = await cloudinary.v2.uploader.upload(file.content);
  FoodImage ={
    public_id:mycloud.public_id,
    url:mycloud.secure_url,
  }
}
const foodObject = {
  name:name,
  price:price,
  discoutPrice:discoutPrice,
  ItemQunatity:ItemQunatity,
  description:description,
  Ingredients:Ingredients,
  Addons:Addons,
  FoodSpecification:FoodSpecification,
  foodconfiguration:[
    {
        resturent:resturentId,
           
        category:categoryId,
         
        foodAttribute:foodattributeId
         
    }
   ],
   FoodImage,
   takeawayoption,
   nonveg,
   publish
}
const food = new Food(foodObject);
await food.save();
    res.status(201).json({
        success:true,
        message:"Food created Successfully",
        food
    })
});



export const getallfood = catchAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  const foodCount = await Food.countDocuments();
  const apiFeature = new ApiFeatures(Food.find(), req.query).search().filter().pagination(resultPerPage)
  let food = await apiFeature.query;
  res.status(200).json({
      success: true,
      message: "getting all the food",
      food,foodCount,resultPerPage
  })
});

export const getfoodbyId = catchAsyncError(async (req, res, next) => {
const food = await Food.findById(req.params.id);
res.status(200).json({
  success: true,
  food
});
});
export const editfoodDetails = catchAsyncError(async (req, res, next) => {
const {name,price,discoutPrice,ItemQunatity,FoodAttribute,description,Ingredients,Addons,FoodSpecification,takeawayoption,publish,nonveg} = req.body;
const food = await Food.findByIdAndUpdate(req.params.id);
if (name) food.name = name;
if (price) food.price =  price;
if (discoutPrice) food.discoutPrice = discoutPrice;
if (ItemQunatity) food.ItemQunatity = ItemQunatity;
if (FoodAttribute) food.FoodAttribute = FoodAttribute;
if (description) food.description = description;
if(Ingredients) food.Ingredients = Ingredients;
if(Addons) food.Addons = Addons;
if(FoodSpecification) food.FoodSpecification = FoodSpecification;
if(takeawayoption==true) food.takeawayoption = takeawayoption;
if(takeawayoption==false) food.takeawayoption = takeawayoption;
if(nonveg==true) food.nonveg= nonveg;
if(nonveg==false) food.nonveg = nonveg
if(publish==true) food.publish = publish;
if(publish==false) food.publish = publish;

await food.save();
res.status(200).json({
  success: true,
  message: "food Updated Successfully",
  food
});
});

export const updatefoodImage= catchAsyncError(async (req, res, next) => {
const food = await Food.findById(req.params.id);
if(req.file){
  const file =getDataUri(req.file);
  await cloudinary.v2.uploader.destroy(food.FoodImage.public_id);
  const mycloud = await cloudinary.v2.uploader.upload(file.content);
food.FoodImage ={
  public_id:mycloud.public_id,
  url:mycloud.secure_url,
}
}
await food.save();
res.status(200).json({
  success: true,
  message: "food image Updated Successfully",
});
});

export const deletefood = catchAsyncError(async (req, res, next) => {
const food = await Food.findByIdAndDelete(req.params.id);
if (!food) return next(new ErrorHandler("food not found", 404));
await cloudinary.v2.uploader.destroy(food.FoodImage.public_id);
await food.deleteOne();
res.status(200).json({
  success: true,
  message: "food Deleted Successfully",
});
});


export const getallfoodCount = catchAsyncError(async (req, res, next) => {
const food = await Food.find({}).countDocuments({});
res.status(200).json({
    success: true,
    message:`Number of Food registered is ${food}`,
    food
})
});


