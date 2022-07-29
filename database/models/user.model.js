const mongoose = require("mongoose")
const validator = require("validator")
const otpGenerator = require('otp-generator')
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        lowecase:true,
        required:true
    },
    age:{
        type:Number,
        default:21
    },
    email:{
        type:String,
        trim:true,
        lowecase:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) 
                throw new Error("invalid email format")
        }
    },
    MyCart:[
        {
productName:{
    type:String,
    trim:true,
} , 
ProductId:{
    type: mongoose.Schema.Types.ObjectId , 
    required:true,
    ref: "product"
}
        }
    ] ,
    otp:{
        type:String,
        trim:true,
        default:otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
        
      }, 
    password:{
        type:String,
        trim:true,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
            }
        }
    ] , 
    image:{
        type:String,
        trim:true,
        lowecase:true
    }
}, {
    timestamps:true
})
userSchema.methods.toJSON = function(){
    const userData= this.toObject()
    delete userData.__v
    delete userData.password
    return userData
}
userSchema.pre("save", async function(){
    const userData = this
    if(userData.isModified("password"))
        userData.password = await bcryptjs.hash(userData.password, 10)
})
userSchema.statics.LoginUser = async function(email , password){
    const userData = await User.findOne({ email})
    if(!userData) throw new Error("No such userSchema")
    const checkpass = await bcryptjs.compare(password  ,userData.password)
    if(!checkpass) throw new Error("Invalid password")
    return userData
}
userSchema.methods.GeneraterTokens = async function(){
    const UserData = this
    const token = jwt.sign({_id : UserData._id} , "123")
    UserData.tokens = UserData.tokens.concat({token})
await UserData.save()
return token
}
const User = mongoose.model("User", userSchema)

module.exports = User
