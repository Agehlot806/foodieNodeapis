import mongoose from "mongoose";
const schema = new mongoose.Schema({
    label:{
        type:String
    },
    tax:{
        type:Number,
    },
    type:{
        type:String,
        enum:["percent","fixed"],
        default:"percent"
    },
    Isenabled:{
        type:Boolean,
    }

})

export const Tax = mongoose.model("Tax",schema)