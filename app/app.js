require("../database/connect")
const express = require("express")
const app = express()
app.use(express.json())
const userRoutes = require("../routes/user.routes")
const productRoutes = require("../routes/product.routes")
const path = require("path")
const hbs = require("hbs")
//routes
// make views public folder to be accessible
// app.use(express.static("public"))
// make views folder to be accessible by app
app.use(express.static(path.join(__dirname, "../views")))
app.set("view engine", "hbs")
app.set("views" , path.join(__dirname, "../views"))
hbs.registerPartials(path.join(__dirname, "../layouts"))

 

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