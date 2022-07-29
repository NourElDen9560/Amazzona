const jwt = require('jsonwebtoken');
const UserModel = require('../database/models/user.model');
const Helper  = require("../app/helper/methods")
const auth = async(req,res, next)=>{
    try{
        // get user cuurent token => from header
        const token = req.header("Authorization").replace("bearer ", "")
        // convet token using jwt to get userId
     const user=  await CheckUser(token)
        // continue
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"unauth"
        })
    }
}
const CheckUser =async (token) => {
    const decodedToken = jwt.verify(token, "123")
    // search db (_id, token)
    const userData = await UserModel.findOne({
        _id:decodedToken._id,
        'tokens.token': token
    })
    // if(! user) unauthorized
    if(!userData) 
    throw new Error("unauth")
   
    console.log(userData)
    return userData
}
const authAdmin = async(req, res, next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const user = await CheckUser(token)
        if(user.type != "admin") throw new Error("you are not admin")
        req.user = user
        req.token = token
        // res.send(req.user)
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"unauth"
        })
       
    }
}
module.exports = {auth , authAdmin}