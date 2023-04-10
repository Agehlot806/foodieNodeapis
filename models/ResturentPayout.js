import mongoose from "mongoose";
const schema = new mongoose.Schema({
    amount:{
        type:Number,
        // required:true
    },
    note:{
        type:String,
    },
    resturent:{
        type:mongoose.Schema.Types.ObjectId,
    }
})

export const ResturentPayout = mongoose.model("ResturentPayout",schema);