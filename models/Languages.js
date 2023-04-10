import mongoose from "mongoose";
const schema= mongoose.Schema({

name:{
    type:String
},
slug:{
    type:String
},
active:{
    type:Boolean
},
isLeft2Right:{
    type:Boolean,
}
})


export const Language = mongoose.model("Language",schema)