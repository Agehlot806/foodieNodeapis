import mongoose from "mongoose";
const schema = new mongoose.Schema({
    commisionType:{
        type:String,
        enum:["fixed","percent"],
    },
    adminCommision:{
        type:Number
    },
    enableAdminCommision:{
        type:String,
        enum:[true,false],
        default:true
    }
    
       

})
export const AdminCommission = mongoose.model("AdminCommission",schema);