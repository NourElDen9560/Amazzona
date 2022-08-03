require("../database/connect")
const express = require("express")
const app = express()
const cors = require("cors")

const userRoutes = require("../routes/user.routes")
const productRoutes = require("../routes/product.routes")
app.use(express.json())
app.use(express.urlencoded({ extended   : true }))
app.use(cors())
//routes
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
// 404 error route
app.all("*", (req,res)=>{
    res.status(404).send({
        apiStatus:false,
        message:"No Page Found"
    })
})
module.exports = app