require("../database/connect")
const express = require("express")
const app = express()
app.use(express.json())
const userRoutes = require("../routes/user.routes")
const productRoutes = require("../routes/product.routes")
//routes
app.use("/api/user",userRoutes)
app.use("/api/post",productRoutes)
// 404 error route
app.all("*", (req,res)=>{
    res.status(404).send({
        apiStatus:false,
        message:"No Page Found"
    })
})
module.exports = app