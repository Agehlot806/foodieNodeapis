import mongoose from "mongoose";
const schema =  new mongoose.Schema({

    pagename:{
        type:String,
    },
    pageslug:{
        type:String
    },
    pagedescription:{
        type:String
    },
    status:{
        type:Boolean,
    }


})

export const Cms = mongoose.model("Cms",schema)