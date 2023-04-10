import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const schema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter your  last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  phone:{
    type:Number,
    required:true,
    uniqure:true,
  },
  userstatus: {
    type:Boolean,
    default:true
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

address1:{
    type:String
},
address2:{
    type:String
},
city:{
    type:String
},
country:{
    type:String
},
postalcode:{
    type:String
},
latitude:{
    type:String
},
longitude:{
    type:String
},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
export const User = mongoose.model("User", schema);