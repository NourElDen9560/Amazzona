const mongoose = require("mongoose")
const Product= mongoose.Schema({
    
    title:{
        type:String,
        trim:true,
        lowecase:true,
        required:true
    },
    count:{
        type:Number,
        min:1 , 
        max:1000
    },
    description:{
        type:String,
        trim:true,
        lowecase:true,
        required:true
    }, 
    CategoryName:{
        type:String,
        trim:true,
        lowecase:true,
        required:true,
        enum:["txt", "file" , "image"]
    },
    price :{
type:Number,
required:true,
min:10 , 
max:100 ,
    } ,

    // txtContent:{
    //     type:String,
    //     trim:true,
    //     required: function(){ return this.type=="txt"}
    // },
    // file:{
    //     type:String,
    //     trim:true,
    //     required:this.type=="file"

    // }
},
{
    timestamps:true
})
const ProductTable = new mongoose.model("product", Product)
module.exports=ProductTable