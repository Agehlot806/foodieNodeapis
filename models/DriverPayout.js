import mongoose from "mongoose";
const schema = new mongoose.Schema({

    amount:{
        type:Number
    },
    note:{
        type:String
    },
    driverid:{
        type:mongoose.Schema.Types.ObjectId,
    
    }


})

export const DriverPayout = mongoose.model("DriverPayout",schema);