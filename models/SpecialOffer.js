import mongoose from "mongoose";
const schema = new mongoose.Schema({
    enableSpecialOffer:{
        type:Boolean,
    
    }

})

export const SpecialOffer = mongoose.model("SpecialOffer",schema)