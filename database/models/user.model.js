const mongoose = require("mongoose")
const validator = require("validator")
const otpGenerator = require('otp-generator')
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: { type: String, trim: true, lowecase: true, required: true, minlength: 3, maxlength: 100 },
    age: { type: Number, default: 21 },
    type: { type: String, enum: ["user", "admin"], default: "user" },
    password: { type: String, trim: true, required: true },
    image: { type: String, trim: true, lowecase: true },
    active: { type: Boolean, default: false },
    email: {
        type: String, unique: true, trim: true, lowecase: true, required: true,
        validate(value) { if (!validator.isEmail(value)) throw new Error("invalid email format") }
    },
    otp: {
        type: String, trim: true,
        default: otpGenerator.generate(15, { upperCaseAlphabets: false, specialChars: false })
    },

    tokens: [{ token: { type: String, } }],
    // balance: { type: Number, default: 0 },

    // transaction:[{
    //     // trans_id 
    //     product_name: {type: String,trim: true,lowecase:true},
    //     product_price:{type: Number,trim:true},
    //     date: {type: Date,default: Date.now},
    // }]
    MyCart: [
        {
            productName: {
                type: String,
                trim: true,
            },
            ProductId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "product"
            }
        }
    ],


}, { timestamps: true })

userSchema.methods.toJSON = function () {
    const userData = this.toObject()
    delete userData.__v
    delete userData.password
    return userData
}
userSchema.pre("save", async function () {
    const userData = this
    if (userData.isModified("password"))
        userData.password = await bcryptjs.hash(userData.password, 10)
})
userSchema.statics.LoginUser = async function (email, password) {
    const userData = await User.findOne({ email })
    if (!userData) throw new Error("No such user found")
    const checkpass = await bcryptjs.compare(password, userData.password)
    if (!checkpass) throw new Error("Invalid password")
    return userData
}
userSchema.methods.GeneraterTokens = async function () {
    const UserData = this
    const token = jwt.sign({ _id: UserData._id }, "123")
    UserData.tokens = UserData.tokens.concat({ token })
    await UserData.save()
    return token
}
const User = mongoose.model("User", userSchema)

module.exports = User
