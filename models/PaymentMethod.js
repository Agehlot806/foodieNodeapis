import mongoose from "mongoose";
const schema = new mongoose.Schema({
    stripe:[
        {
            stripe_key:{
                type:String,
                default:"pk_test_51Kaaj9SE3HQdbrEJneDaJ2aqIyX1SBpYhtcMKfwchyohSZGp53F75LojfdGTNDUwsDV5p6x5BnbATcrerModlHWa00WWm5Yf5h"
            },
            stripe_secret:{
                type:String,
                default:"sk_test_51Kaaj9SE3HQdbrEJSmmdpM1yumzshT7yd7p0BMZDzuvpklOPmbOhtXrcdw66TMiG71ot1duKiq31RmJUYlz3keY7004oZKb97u"
            }
        }
    ],
    CashOnDelivery:{
        type:Boolean,
    },
    razorpay:[
        {
            razorpay_key:{
                type:String,
                default:"rzp_test_0iHc1FA4UBP0H3"
            },
            razorpay_secret:{
                type:String,
                default:"Y79h9H1l4qLTKvgXFDei9pA5"
            }
        }
    ],
    enable_razorpay:{
       type:Boolean,
    },
    enable_sandbox_mode_for_razorpay:{
       type:Boolean,
    },
    paytm:[
       { 
        paytm_merchant_key:{
            type:String,
            default:"B%YvQW0k#NGxN4L0"
        },
        paytmId:{
            type:String,
            default:"OQhtbm21350853223200"
        }
    }
    ],
    enable_paytm:{
        type:Boolean
    },
    enable_sandbox_mode_for_paytm:{
     type:Boolean,
    }

})

export const PaymentMethod  = mongoose.model("PaymentMethod",schema)