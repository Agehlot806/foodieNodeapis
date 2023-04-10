import mongoose from "mongoose";
const schema = new mongoose.Schema({

    resturents:{
        type:Number,
        default:0,
    },
    orders:{
        type:Number,
        default:0,
    },
    foods:{
        type:Number,
        default:0,
    },
    drivers:{
        type:Number,
        default:0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }

});


export const Stats = mongoose.model("Stats",schema);

