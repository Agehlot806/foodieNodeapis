import mongoose from "mongoose";
const schema = new mongoose.Schema({    

    ResturentNearbyRadius:{
        type:Number,
        default:5000
    }

})


export const RadiusConfiguration = mongoose.model("RadiusConfiguration",schema);