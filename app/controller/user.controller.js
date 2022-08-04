const userModel = require("../../database/models/user.model")
const ProductModel = require("../../database/models/product.model")
const otpGenerator = require('otp-generator')
const bcryptjs = require("bcryptjs")
const otp = require("../helper/send_otp").otp
const res_gen = require("../helper/methods").res_gen
class User {
    static Register = async (req, res) => {
        try {
            const test = await userModel.findOne({ email: req.body.email })
            if (test) { return res_gen(res, 404, "E-mail already in use ", "E-mail already in use") }
            const User = new userModel(req.body)
            await User.save();
            otp(User);
            res_gen(res, 200, User, "Registered successfully");
        } catch (err) { res_gen(res, 404, "Cannot Add User", err.message); }
    }

    static login = async (req, res) => {
        try {
            const UserData = await userModel.LoginUser(req.body.email, req.body.password)
            if (UserData.active == false) { return res_gen(res, 404, "User is not active... Please check your mail", "User is not active... Please check your mail"); }

            const token = await UserData.GeneraterTokens();
            res_gen(res, 200, { token, UserData }, "done")
        }
        catch (e) { res_gen(res, 404, "User Not Found", e.message); }
    }

    static active = async (req, res) => {
        try {
            const UserData = await userModel.findOne({ otp: req.params.otp })
            if (!UserData) throw new Error("OTP is not valid")
            if (UserData.active == true) throw new Error("User is already active")
            if (UserData.otp == req.params.otp) {
                UserData.active = true;
                UserData.otp = "";
                await UserData.save();
                res_gen(res, 200, UserData, "User is active");
            }
        } catch (e) { res_gen(res, 404, "OTP is not valid", e.message) }}

    // Send Emails Method don't used
    static ForgetPassword = async (req, res) => {
        try {
            const NewOtp = otpGenerator.generate(6, { upperCaseAlpha: false });
            const Email = req.body.email, NewPassword = req.body.password;
            const UserData = await userModel.findOne({ email: Email });
            UserData.otp = NewOtp;
            const UserOTP = NewOtp
            if (UserOTP != NewOtp)
                throw new Error("Check Code Again")
            UserData.password = NewPassword; UserData.status = true
            await UserData.save();
            res_gen(res, 200, UserData, "done")
        } catch (err) { res_gen(res, 404, "404 Not Found", err.message); } }

    static Myprofile = async (req, res) => {
        try { res_gen(res, 200, req.user, " successfully"); }
        catch (err) { res_gen(res, 404, "404 Not Found", err.message); } }

    static logout = async (req, res) => {
        const User = req.user
        const token = req.token
        try {
            User.tokens = await User.tokens.filter(t => t.token != token);
            await User.save();
            res_gen(res, 200, User, " successfully"); }
        catch (err) { res_gen(res, 404, "404 Not Found", err.message); } }

    static logoutall = async (req, res) => {
        try {
            const User = await userModel.find({});
            User.forEach(async (user) => { user.tokens = []; await user.save(); })

            res_gen(res, 200, User, " successfully");
        } catch (err) { res_gen(res, 404, "404 Not Found", err.message); } }

    static editPassword = async (req, res) => {
        const User = req.user

        const Newpassword = req.body.password
        try {
            const CheckPassword = await bcryptjs.compare(Newpassword, User.password)
            if (CheckPassword)
                throw new Error("New Password equal Newpassword")
            User.password = Newpassword
            await User.save();
            res_gen(res, 200, User, " successfully");
        } catch (err) { res_gen(res, 404, "404 Not Found", err.message); } }

    static EditMyProfile = async (req, res) => {
        const Data = req.body
        const UserID = req.user._id
        try {
            const Profile = await userModel.findById(UserID);
            for (const key in Data) {  Profile[key] = Data[key] }
            await Profile.save();
            res_gen(res, 200, Profile, " successfully");
        } catch (err) { res_gen(res, 404, "404 Not Found", err.message); } }

    static UploadImg = async (req, res) => {
        try {
            const path = require("path"), fs = require("fs")
            if (!req.file)
                throw new Error("File Not exists")
            const Extinstion = path.extname(req.file.originalname), filename = `${req.file.fieldname}${Extinstion}`
            fs.renameSync(req.file.path, `uploads\\${filename}`)
            req.user.image = filename
            await req.user.save(); res_gen(res, 200, req.user, " successfully"); }
        catch (err) { res_gen(res, 404, "404 Not Found", err.message); } }

    static AddToCart = async (req, res) => {
        const ProductId = req.params.id;
        const User = req.user;
        try {
            const Product = await ProductModel.findById(ProductId);
            User.MyCart.push({
                productName: Product.title,
                ProductId: Product._id })
            await User.save();
            res_gen(res, 200, User, " successfully"); }
        catch (err) { res_gen(res, 404, "404 Not Found", err.message); }}

    // Remove by ProductId
    static RemoveFromCart = async (req, res) => {
        const ProductId = req.params.id;
        const User = req.user;
        try {
            User.MyCart = User.MyCart.filter(c => c.ProductId != ProductId)
            await User.save();
            res_gen(res, 200, User, " successfully"); }
        catch (err) { res_gen(res, 404, "Can't remove from cart", err.message);}}

    //Loop in cart and Reduce price from Visa
    static Purchase = async (req, res) => {
        try { res_gen(res, 200, req.user, " successfully"); }
        catch (err) { res_gen(res, 404, "can't purchase", err.message);}}

    // Admin
    static ShowAll = async (req, res) => {
        try {
            const AllUsers = await userModel.find();
            res_gen(res, 200, AllUsers, " successfully");}
        catch (err) {res_gen(res, 404, "404 Not Found", err.message);}}
}
module.exports = User
