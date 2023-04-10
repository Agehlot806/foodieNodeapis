import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate: validator.isEmail,

    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    driverAvatar:{
        public_id:{
            type:String,
            // required:true,
        },
        url:{
            type:String,
            // required:true
        }
    },
    DriverStatus:{
       type:Boolean,
       default:true
    },
    DriverAvailable:{
        type:Boolean,
        default:true
    },
    CarNumber:{
        type:String,
        required:true,
    },
    CarName:{
        type:String,
        required:true,
    },
    CarImage:{
        public_id:{
            type:String,
            // required:true
        },
        url:{
            type:String,
            // required:true
        }
    }
});
schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });


export const Driver = mongoose.model("Driver",schema);


