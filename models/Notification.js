import mongoose from "mongoose";

const schema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    sendTo:{
        type: mongoose.Schema.Types.ObjectId,

    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export const Notification = mongoose.model("Notification",schema);