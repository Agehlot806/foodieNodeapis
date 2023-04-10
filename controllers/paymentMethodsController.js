import { PaymentMethod } from "../models/PaymentMethod.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// import ErrorHandler from "../utils/ErrorHandler.js";


export const PaymentMethodInfocreate= catchAsyncError(async (req, res, next) => {
    const {stripe,razorpay,paytm,CashOnDelivery,enable_paytm,enable_razorpay,enable_sandbox_mode_for_paytm,enable_sandbox_mode_for_razorpay}= req.body;
    if(!stripe||!razorpay||!paytm||!CashOnDelivery)
    return next(new ErrorHandler("Please add all field",400))
    let paymentmethod = await PaymentMethod.find({});
   paymentmethod = await PaymentMethod.create({
        stripe,razorpay,paytm,CashOnDelivery,enable_paytm,enable_razorpay,enable_sandbox_mode_for_paytm,enable_sandbox_mode_for_razorpay
    });
    res.status(200).json({
      success: true,
      message: "paymentmethod created Successfully",
      paymentmethod,
    
    });
  });

export const PaymentMethodInfoandEdit= catchAsyncError(async (req, res, next) => {
    const {stripe,razorpay,paytm,CashOnDelivery,enable_paytm,enable_razorpay,enable_sandbox_mode_for_paytm,enable_sandbox_mode_for_razorpay}= req.body;
    const paymentmethod = await PaymentMethod.findByIdAndUpdate(req.params.id)
    if (stripe) paymentmethod.stripe= stripe;
    if(CashOnDelivery==true) paymentmethod.CashOnDelivery= CashOnDelivery;
    if(CashOnDelivery==false) paymentmethod.CashOnDelivery =CashOnDelivery;
    if(enable_razorpay==true) paymentmethod.enable_razorpay = enable_razorpay;
    if(enable_razorpay==false) paymentmethod.enable_razorpay = enable_razorpay;
    if(enable_sandbox_mode_for_razorpay==true) paymentmethod.enable_sandbox_mode_for_razorpay = enable_sandbox_mode_for_razorpay;
    if(enable_sandbox_mode_for_razorpay==false) paymentmethod.enable_sandbox_mode_for_razorpay = enable_sandbox_mode_for_razorpay;
    if(enable_paytm==true) paymentmethod.enable_paytm = enable_paytm;
    if(enable_paytm==false) paymentmethod.enable_paytm = enable_paytm;
    if(enable_sandbox_mode_for_paytm==true) paymentmethod.enable_sandbox_mode_for_paytm = enable_sandbox_mode_for_paytm;
    if(enable_sandbox_mode_for_paytm==false) paymentmethod.enable_sandbox_mode_for_paytm = enable_sandbox_mode_for_paytm;
    if (razorpay) paymentmethod.razorpay =razorpay;
    if (paytm) paymentmethod.paytm =  paytm;
  await paymentmethod.save();
    res.status(200).json({
      success: true,
      message: "paymentmethod Updated Successfully",
      paymentmethod,
    
    });
  });


  