import mongoose from "mongoose";
const schema = new mongoose.Schema({

dineforresturent:{
    type:Boolean

},
dineforcustomer:{
    type:Boolean
}


})

export const DinIn = mongoose.model("DineIn",schema)