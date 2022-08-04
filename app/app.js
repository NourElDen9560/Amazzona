require("../database/connect")
const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
app.use(express.static(path.join(__dirname,"../uploads")))


app.use(express.json())
app.use(express.urlencoded({ extended   : true }))
app.use(cors())
//routes
const userRoutes = require("../routes/user.routes")
const productRoutes = require("../routes/product.routes")
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