import mongoose from "mongoose";
const schema = new mongoose.Schema({

    name:{
        type:String
    },
    code:{
        type:String
    },
    symbol:{
        type:String,
    },
    digitsAfterDecimal:{
        type:Number,
    },
    symbolAtRight:{
        type:String,
        enum:[true,false],
        default:true,
    },
    active:{
        type:String,
        enum:[true,false],
        default:true,
    }


})


export const Currency = mongoose.model("Currency",schema);