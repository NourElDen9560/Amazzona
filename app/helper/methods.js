class MyOwnHelper {
static res_gen = (res , statusCode , data , message)=>{
    res.status(statusCode).send({
        status: statusCode == 200 || 201 ? "Success" : "Error",
        data , 
        message
    })
}
}
module.exports =MyOwnHelper