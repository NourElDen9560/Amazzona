const router = require("express").Router()
const product = require("../app/controller/product.controller")
const {auth , authAdmin} = require("../middleware/auth")
const upload = require("../middleware/files.middleware")

// release 1 : all user can control
// router.get("/add_prodcut",(req,res)=>{res.render("h")})

// router.post("/add_prodcut",authAdmin,product.add_prodcut)
router.post("/add_prodcut",product.add_prodcut)

// router.patch("/edit_product/:id",authAdmin,product.edit_product)
router.patch("/edit_product/:id",product.edit_product)

// router.delete("/delete_product/:id",authAdmin,product.delete_product)
router.delete("/delete_product/:id",product.delete_product)

///////////////////////////////////////////////////////////////////////////
router.get("/list_all_products", product.list_all_products)
router.get("/list_single_product/:id",product.list_single_product)
///////////////////////////////////////////////////////////////////////////
router.post("/add_comment/:id",auth,product.add_comment) //
router.patch("/edit_comment/:id/:cid",auth,product.edit_comment) // delete same user id comment id
router.delete("/delete_comment/:id/:cid",auth, product.delete_comment)
///////////////////////////////////////////////////////////////////////////
router.post("/add_rate/:id",auth, product.add_rate)
router.get("/show_rate/:id", product.show_rate)
///////////////////////////////////////////////////////////////////////////
router.post("/sold_counter_add/:id",auth, product.sold_counter_add)
router.get("/sold_counter_show/:id", product.sold_counter_show)

module.exports=router
