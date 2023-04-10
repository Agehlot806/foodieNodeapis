import mongoose from "mongoose";
const schema = new mongoose.Schema({

    code:{
        type:String,
        required:true
    },
    discountType:{
        type:String,
        enum:["fixed","percent"],
        default:"fixed"
    },
    discount:{
        type:Number,
        required:true
    },
    expiresAt:{
        type:Date,
        default:Date.now

    },
    resturent:{
        type:mongoose.Schema.Types.ObjectId,
    },
 
    description:{
        type:String
    },
    couponImage:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    enable:{
        type:Boolean,
        default:true
    }



})


export const Coupons = mongoose.model("Coupons",schema);