import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const schema = new mongoose.Schema({
    // resturent admin schmea
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
          avatar: {
            public_id: {
              type: String,
              // required: true,
            },
            url: {
              type: String,
              // required: true,
            },
          },
//resturent details schmeaa
        Rname:{
          type:String,
          required:true
        },
        Rcategory:{
            type:mongoose.Schema.Types.ObjectId,      
        },
        Rphone:{
            type:Number,
            required:true
        },
        Raddress:{
            type:String,
            required:true
        },
        Rlatitude:{
            type:String
        },
        Rlongitude:{
            type:String
        },
        RImage: {
            public_id: {
              type: String,
              // required: true,
            },
            url: {
              type: String,
              // required: true,
            },
          },

          RDescription:{
            type:String
          },


    RGallery: {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
      },

    RServices:{
      servicetype:String,
      status:Boolean,
    },
      //working hours schma
        RdayOfWeek:
           {
              DaysType:String,
              from:Date,
              to:Date,
           }
        ,
            
          RopenTime: {
            type: Date,
            default:Date.now,
       
          },
          RcloseTime: {
            type: Date,
            default:Date.now
            
          },
      Resturentstatus:{
        type:Boolean,
        default:true
      },
      DineInFeature:{
   type:Boolean,
   default:true,
      },

    //   Add_Special_Offer schema
        specialOfferddays:
          {
            dayType:String,
            open:Date,
            close:Date,
            discount:Number,

          }
        ,

        
          OfferopenTime: {
            type: Date,
            default:Date.now
           
          },
          OffercloseTime: {
            type: Date,
            default:Date.now
          
          },
          OfferDiscount:{
            type:Number,
            enum:["%","ruppe"]
          },
          OfferDiscount_type:{
            type:String,
            enum:["devlivery_discount","dine_in_discount"]
          },
        HumbleImage:{
            public_id:{
                type:String,
            },
            url:{
                type:String
            }
        },
        Story_Video:{
            public_id:{
                type:String,
            },
            url:{
                type:String
            }
        }
      
})
schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

export const Resturent = mongoose.model("Resturent", schema);