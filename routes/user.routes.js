const router = require("express").Router()
const userController = require("../app/controller/user.controller")
const {auth , authAdmin} = require("../middleware/auth")
const upload = require("../middleware/files.middleware")


// User
router.post("/register", userController.Register)//done
router.post("/login", userController.login)//done
router.get("/myprofile", auth ,userController.Myprofile) //done
router.post("/edit", auth ,userController.EditMyProfile)
router.post("/updatepassword", auth ,userController.editPassword)
router.post("/forgetpassword/:id" ,userController.ForgetPassword) // edited in controller 
router.post("/addtocart/:id" , auth, userController.AddToCart)
router.delete("/removefromcart/:id" , auth,userController.RemoveFromCart)
router.post('/uploadimg', auth ,upload.single('img'), userController.UploadImg)
router.post('/purchase' , auth ,userController.Purchase) // Need Visa Card or Initail cost
// Admin
router.post('/showall', authAdmin , userController.ShowAll)

module.exports=router