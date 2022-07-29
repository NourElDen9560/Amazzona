const router = require("express").Router()
const userController = require("../app/controller/user.controller")
const {auth , authAdmin} = require("../middleware/auth")
const upload = require("../middleware/files.middleware")


// User
router.post("/register", userController.Register)
router.post("/login", userController.login)
router.get("/myprofile", auth ,userController.Myprofile)
router.get("/edit", auth ,userController.EditMyProfile)
router.get("/updatepassword", auth ,userController.editPassword)
router.get("/forgetpassword/:id" ,userController.ForgetPassword) // edited in controller 
router.get("/addtocart/:id" , auth, userController.AddToCart)
router.get("/removefromcart/:id" , auth,userController.RemoveFromCart)
router.post('/uploadimg', auth ,upload.single('img'), userController.UploadImg)
router.post('/purchase' , auth ,userController.Purchase) // Need Visa Card or Initail cost
// Admin


module.exports=router