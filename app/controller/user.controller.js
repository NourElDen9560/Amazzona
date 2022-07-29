const userModel = require("../../database/models/user.model")
const ProductModel = require("../../database/models/product.model")
const otpGenerator = require('otp-generator')
const bcryptjs = require("bcryptjs")
const Helper  = require("../helper/methods")
class User{
    static Register = async (req , res)=>{
        try{
          
            const User = new userModel(req.body)
            console.log(User)
            
            await User.save()
            Helper.GenerateStatus(res , 200 , User , "Registered successfully"); 
        }
        catch(err){
            Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); 
        }
        
       }
       static login = async(req, res)=>{
        try{
            const UserData = await userModel.LoginUser(req.body.email , req.body.password)
    const token =  await UserData.GeneraterTokens();
    Helper.GenerateStatus(res , 200 , UserData ,  "done")
        }
        catch(e){     
            Helper.GenerateStatus(res , 404 , "404 Not Found" ,e.message); 
        }
    }
    // Send Emails Method don't used
    static ForgetPassword = async (req , res)=>{
        try{
            const NewOtp = otpGenerator.generate(6, { upperCaseAlpha: false });
            const Email = req.body.email,NewPassword = req.body.password ;
            const UserData =await userModel.findOne({ email: Email });
            UserData.otp = NewOtp;
            const UserOTP =   NewOtp
            if(UserOTP != NewOtp)
            throw new Error("Check Code Again")
            UserData.password=  NewPassword;UserData.status=  true
           await UserData.save();
            Helper.GenerateStatus(res , 200 , UserData ,  "done")
        }
        catch(err){Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); }
        }
        static Myprofile = async (req, res)=>{
            try{
              
              
                Helper.GenerateStatus(res , 200 , req.user , " successfully"); 
            }
            catch(err){
                Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); 
            }
        }
        static logout = async (req, res)=>{
            const User = req.user
            const token = req.token
            try{
              User.tokens = await User.tokens.filter(t => t.token != token);
              await User.save();
                Helper.GenerateStatus(res , 200 ,User, " successfully"); 
            }
            catch(err){
                Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); 
            }
        }
        static editPassword =async (req, res)=>{
            const User = req.user
           
            const Newpassword = req.body.password
            try{
                const CheckPassword = await bcryptjs.compare(Newpassword  ,User.password)
             if(CheckPassword) 
             throw new Error("New Password equal Newpassword") 
              User.password = Newpassword
              await User.save();
                Helper.GenerateStatus(res , 200 , User , " successfully"); 
            }
            catch(err){
                Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); 
            }
        } 
        static EditMyProfile = async(req, res)=>{
            const Data = req.body
            const UserID = req.user._id
            try{
                const Profile= await TaskModel.findById(UserID);
               for(const key in Data){
                Profile[key] = Data[key]
               }
               
                await Profile.save();
                Helper.GenerateStatus(res , 200 , Profile , " successfully");   
            }
            catch(err){
                Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); 
            }
        }
        static UploadImg = async(req, res)=>{
            try{
              const path = require("path"), fs = require("fs")
              if(!req.file)
        throw new Error("File Not exists")
        const Extinstion = path.extname(req.file.originalname), filename = `${req.file.fieldname}${Extinstion}`
        fs.renameSync(req.file.path , `uploads\\${filename}`)
        req.user.image = filename
        await req.user.save(); Helper.GenerateStatus(res , 200 , req.user , " successfully"); }
              catch(err){Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); }
        }
        static AddToCart =async (req, res) =>{
const ProductId = req.params.id;
const User = req.user;
try{
     const Product = await ProductModel.findById(ProductId);
     User.MyCart.push({
        productName:Product.title , 
        ProductId:Product._id
})         
    await User.save();          
    Helper.GenerateStatus(res , 200 ,User , " successfully"); 
}
catch(err){
    Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); 
}

        }
        static RemoveFromCart = async (req, res) =>{
const ProductId = req.params.id;
const User = req.user;
try{
    User.MyCart = User.MyCart.filter(c=>c.ProductId != ProductId)
    await User.save();          
    Helper.GenerateStatus(res , 200 ,User , " successfully"); 
}
catch(err){
    Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); 
}
        }
        //Loop in cart and Reduce price from Visa
        static Purchase = async (req, res)=>{
            try{
              
              
                Helper.GenerateStatus(res , 200 , req.user , " successfully"); 
            }
            catch(err){
                Helper.GenerateStatus(res , 404 , "404 Not Found" ,err.message); 
            }
        }

}
module.exports = User