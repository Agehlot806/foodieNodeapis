import { Currency } from "../models/Currency.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/apifeatures.js";

export const createCurrency = catchAsyncError(async(req,res,next)=> {
    const {name,code,symbol,digitsAfterDecimal,symbolAtRight,active} = req.body;
    if(!name||!code||!symbol)
    return next(new ErrorHandler("Please add all feilds",400));
    let currency  =await Currency.findOne({name})
    if(currency)
    return next(new ErrorHandler("currency already defined",409))
    currency =  await Currency.create({
            name,code,symbolAtRight,digitsAfterDecimal,active
    })
    res.status(201).json({
        success:true,
        message:"currency created Successfully",
        currency
    })
});

export const getallcurrency= catchAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  const getallcurrencyCount = await User.countDocuments();
  const apiFeature = new ApiFeatures(User.find(), req.query).search().filter().pagination(resultPerPage)
  let currency = await apiFeature.query;
    res.status(200).json({
        success: true,
        message: "getting all the currency",
        currency,getallcurrencyCount,resultPerPage
    })
});


export const editcurrency = catchAsyncError(async (req, res, next) => {
  const {name,code,symbol,digitsAfterDecimal,symbolAtRight,active} = req.body;
  const currency = await Currency.findByIdAndUpdate(req.params.id);
  if (name) currency.name = name;
  if (code) currency.code  =  code;
  if (symbol) currency.symbol = symbol;
  if (digitsAfterDecimal) currency.digitsAfterDecimal = digitsAfterDecimal;
  if (symbolAtRight==true) currency.symbolAtRight = symbolAtRight;
  if (symbolAtRight==false) currency.symbolAtRight = symbolAtRight;
  if (active==true) currency.active = active;
  if (active==false) currency.active = active;
  await currency.save();
  res.status(200).json({
    success: true,
    message: "currency Updated Successfully",
    currency
  });
});

export const deletecurrency = catchAsyncError(async (req, res, next) => {
  const currency = await Currency.findByIdAndDelete(req.params.id);
  if (!currency) return next(new ErrorHandler("currency not found", 404));
  await currency.deleteOne();
  res.status(200).json({
    success: true,
    message: "currency Deleted Successfully",
  });
});
