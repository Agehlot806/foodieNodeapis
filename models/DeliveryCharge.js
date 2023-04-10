import mongoose from "mongoose";
const schema = new mongoose.Schema({
    Delivery_Charges_Per_km:{
        type:Number,
        default:5
    },
    Minimum_Delivery_Charges:{
        type:Number,
        default:50
    },
    Minimum_Delivery_Charges_Within_Km:{
        type:Number,
        default:12
    },
    vendor_can_modifyId:{
        type:Boolean,
    }
})

export const DeliveryCharges = mongoose.model("DeliveryCharges",schema)