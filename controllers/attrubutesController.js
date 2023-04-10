import {FoodAttribute} from "../models/Attribute.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/apifeatures.js";


export const CreateFoodAttrubute = catchAsyncError(async(req,res,next)=> {
    const {name} = req.body;
    if(!name)
    return next(new ErrorHandler("Please add all feilds",400));
    let foodattribute =await FoodAttribute.findOne({name})
    if(foodattribute)
    return next(new ErrorHandler("FoodAttribute already defined",409))
    foodattribute =  await FoodAttribute.create({
            name
        
    })
    res.status(201).json({
        success:true,
        message:"FoodAttrubute created Successfully",
        foodattribute
    })
})

export const editfoodAttribute = catchAsyncError(async (req, res, next) => {
  const {name} = req.body;
  const foodattribute = await FoodAttribute.findById(req.params.id);

  if (name) foodattribute.name = name;

  await foodattribute.save();

  res.status(200).json({
    success: true,
    message: "FoodAttribute Updated Successfully",
  });
});

export const deleteFoodAttrubute = catchAsyncError(async (req, res, next) => {
  const foodattribute = await FoodAttribute.findById(req.params.id);

  if (!foodattribute) return next(new ErrorHandler("foodAttrubute not found", 404));
  await foodattribute.deleteOne();
  res.status(200).json({
    success: true,
    message: "foodAttribute Deleted Successfully",
  });
});


export const getallFoodAttribute = catchAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  const getallFoodAttributeCount = await FoodAttribute.countDocuments();
  const apiFeature = new ApiFeatures(FoodAttribute.find(), req.query).search().filter().pagination(resultPerPage)
  let foodattribute = await apiFeature.query;
  res.status(200).json({
    success: true,
    foodattribute,getallFoodAttributeCount,resultPerPage
  });
});

