const router = require("express").Router()
const product = require("../app/controller/product.controller")
const {auth , authAdmin} = require("../middleware/auth")
const upload = require("../middleware/files.middleware")

// release 1 : all user can control 
router.get("/add_prodcut",(req,res)=>{res.render("h")}) 

router.post("/add_prodcut",product.add_prodcut) 
router.patch("/edit_product" ,product.edit_product)   
router.delete("/delete_product" ,product.delete_product)  
///////////////////////////////////////////////////////////////////////////
router.get("/list_all_products", product.list_all_products) 
router.get("/list_single_product",product.list_single_product)
///////////////////////////////////////////////////////////////////////////
router.post("/add_comment/" ,product.add_comment) //  
router.patch("/edit_comment/"  ,product.edit_comment)
router.delete("/delete_comment/"  , product.delete_comment)
///////////////////////////////////////////////////////////////////////////
router.post("/add_rate/", product.add_rate)
router.get("/show_rate/", product.show_rate)
///////////////////////////////////////////////////////////////////////////
router.post("/sold_counter_add/" , product.sold_counter_add)
router.get("/sold_counter_show/" , product.sold_counter_show)

module.exports=router