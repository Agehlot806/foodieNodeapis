import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    categoryImage:{

        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    publish:{
        type:Boolean,
        default:true,
    },
    showInHomePage:{
        type:Boolean,
        default:true,
        
    },
   
            foodquality:{
                type:Boolean,
                default:true
            },
            politebehaviour:{
                type:Boolean,
                default:true
            },
            flavoursoffood:{
                type:Boolean,
                default:true
            },
            textureoffood:{
                type:Boolean,
                default:true
            },
            hygenicfood:{
                type:Boolean,
                default:true
            },

})

export const Categories = mongoose.model("Categories",schema);