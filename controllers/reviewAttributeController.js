import {ReviewFoodAttribute} from "../models/ReviewAttribute.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/apifeatures.js";


export const CreateReviewFoodAttrubute = catchAsyncError(async(req,res,next)=> {
    const {name} = req.body;
    if(!name)
    return next(new ErrorHandler("Please add all feilds",400));
    let foodAttributeReview =await ReviewFoodAttribute.findOne({name})
    if(foodAttributeReview)
    return next(new ErrorHandler("ReviewFoodAttribute already defined",409))
    foodAttributeReview =  await ReviewFoodAttribute.create({
            name
        
    })
    res.status(201).json({
        success:true,
        message:"ReviewFoodAttribute created Successfully",
        foodAttributeReview
    })
})

export const editReviewfoodAttribute = catchAsyncError(async (req, res, next) => {
  const {name} = req.body;
  const foodAttributeReview = await ReviewFoodAttribute.findById(req.params.id);

  if (name) foodAttributeReview.name = name;

  await foodAttributeReview.save();

  res.status(200).json({
    success: true,
    message: "ReviewFoodAttribute Updated Successfully",
  });
});

export const deleteFoodAttrubuteReview = catchAsyncError(async (req, res, next) => {
  const foodAttributeReview = await ReviewFoodAttribute.findById(req.params.id);

  if (!foodAttributeReview) return next(new ErrorHandler("foodAttributeReview not found", 404));
  await foodAttributeReview.deleteOne();
  res.status(200).json({
    success: true,
    message: "foodAttributeReview Deleted Successfully",
  });
});


export const getallFoodAttributeReview = catchAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  const getallFoodAttributeReview= await ReviewFoodAttribute.countDocuments();
  const apiFeature = new ApiFeatures(ReviewFoodAttribute.find(), req.query).search().filter().pagination(resultPerPage)
  let foodattributereview = await apiFeature.query;
  res.status(200).json({
    success: true,
    foodattributereview,resultPerPage,getallFoodAttributeReview
  });
});
