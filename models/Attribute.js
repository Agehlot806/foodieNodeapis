import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

export const FoodAttribute  = mongoose.model("FoodAttribute",schema)