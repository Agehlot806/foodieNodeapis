import mongoose from "mongoose";
const schema = new mongoose.Schema({
Globalsetting:[
    {
        applicationName:{
            type:String,
            // default:"Foodie"
        },
        metaTittle:{
            type:String,
            // default:"Foodie - Your Food Delivery Partner"
        },
        
    }
],
contactUs:[
    {
        address:{
            type:String,
    
        },
        email:{
            type:String,
           
        },
        phone:{
            type:Number,
        }
    }
],
storyLength:{
    type:Number
},
version:[
    {
        appversion:{
            type:Number
        },
        webversion:{
            type:Number
        }
    }
],
applicationLogo:{
    public_id:{
        type:String,
        // required:true
    },
    url:{
        type:String,
        // required:true
    }
},
defaultPlaceholderImage:{
    public_id:{
        type:String,
        // required:true
    },
    url:{
        type:String,
        // required:true
    }
},
ApplicationFavIconImage:{
    public_id:{
        type:String,
        // required:true
    },
    url:{
        type:String,
        // required:true
    }
}

})


export const Setting = mongoose.model("Setting",schema);