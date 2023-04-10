import {DeliveryCharges} from "../models/DeliveryCharge.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";


export const CreateDeliveryCharges = catchAsyncError(async(req,res,next)=> {
    const {Delivery_Charges_Per_km,Minimum_Delivery_Charges_Within_Km,Minimum_Delivery_Charges,vendor_can_modifyId} = req.body;
   let  deliverycharges =  await DeliveryCharges.create({
        Delivery_Charges_Per_km,Minimum_Delivery_Charges_Within_Km,Minimum_Delivery_Charges,vendor_can_modifyId
    })
    res.status(201).json({
        success:true,
        message:"delivery charges  created Successfully",
        deliverycharges
    })
    });

    export const editDeliveryCharges = catchAsyncError(async (req, res, next) => {
        const {Delivery_Charges_Per_km,Minimum_Delivery_Charges_Within_Km,Minimum_Delivery_Charges,vendor_can_modifyId} = req.body;
        // console.log(vendor_can_modifyId)
        let deliverycharges = await DeliveryCharges.findByIdAndUpdate(req.params.id);
        if (Delivery_Charges_Per_km) deliverycharges.Delivery_Charges_Per_km = Delivery_Charges_Per_km;
        if (Minimum_Delivery_Charges_Within_Km) deliverycharges.Minimum_Delivery_Charges_Within_Km =  Minimum_Delivery_Charges_Within_Km;
        if (Minimum_Delivery_Charges) deliverycharges.Minimum_Delivery_Charges = Minimum_Delivery_Charges;
        if(vendor_can_modifyId==true) deliverycharges.vendor_can_modifyId = vendor_can_modifyId;
        if(vendor_can_modifyId==false) deliverycharges.vendor_can_modifyId = vendor_can_modifyId;
        
        await deliverycharges.save();
        res.status(200).json({
          success: true,
          message: "delivery charges Updated Successfully",
          deliverycharges
        });
      });



   