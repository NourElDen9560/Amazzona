const mongoose = require("mongoose")
const product_schema = mongoose.Schema({

    title: { type: String, required: true, trim: true, lowecase: true },
    details: { type: String, required: true, trim: true, lowecase: true },
    price: { type: Number, required: true, trim: true, min: 10, max: 100, },
    img: { type: String, required: true, trim: true, lowecase: true, default: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" },
    sold: { type: Number, default: 0, trim: true, lowecase: true },
    Brand: { type: String, trim: true, lowecase: true, },
    quantity: { type: Number, required: true, min: 1, trim: true, lowecase: true },

    rates: [{
        rate: { type: Number, default: 0, trim: true, lowecase: true },
        userID: { type: String, default: "", trim: true, lowecase: true }
    }],

    comments: [{
        comment: { type: String, required: true },
        userId: { type: String, ref: "User" }
    }
    ],


    // CategoryName:{type:String,trim:true,lowecase:true,required:true,enum:["pc","labtop","mobile"]},
    // addedby:{ type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},  // may be client sell a product or site admin
},
    {
        timestamps: true
    })
const Prodcut = new mongoose.model("Prodcut", product_schema)
module.exports = Prodcut 
