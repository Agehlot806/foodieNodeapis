import mongoose from "mongoose";
const schema = new mongoose.Schema({    

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
    },
   foodconfiguration:[
    {
        resturent:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Resturent",
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
        },
        foodAttribute:{
            type:mongoose.Schema.Types.ObjectId,
        }
    }
   ],

    FoodImage:{
        public_id:{
            type:String,
            // required:true
        },
        url:{
            type:String,
            // required:true
        }
    },
    description:{
        type:String,
    },
    Ingredients:[{
        calories:{
            type:Number
        },
        grams:{
            type:Number,
        },
        fats:{
            type:Number,
        },
        protien:{
            type:Number,
        }
    }],
    Addons:[{
        title:{
            type:String
        },
        price:{
            type:Number

        }
    }],
    FoodSpecification:[{
        label:{
            type:String
        },
        value:{
            type:Number,
        }
    }],


    publish:{
        type:Boolean,
        default:true
    },
    nonveg:{
        type:Boolean,
        default:true
    },
    takeawayoption:{
        type:Boolean,
        default:true
    }
    
}
)


export const Food = mongoose.model("Food",schema);