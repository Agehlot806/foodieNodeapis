import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    setorder:{
        type:Number,
        required:true
    },
    photo:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            requried:true
        }

    },
    bannerposition:{
        type:String,
        enum:["Top","middle"],
        required:true
    },
    bannerdetails:[{
        vendor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Resturent"
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Food"
        },
        externallink:{
            type:String,
        }
       
 }],
 ispublish:{
    type:Boolean,
 }

})
export const Banner = mongoose.model("Banner",schema);