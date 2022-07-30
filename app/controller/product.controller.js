const productSchema = require("../../database/models/product.model")
const res_gen = require("../helpers/helper")    /* ### LOOK AT NOTES IN END OT FILE ### */  
class Product {

    static add_prodcut = async (req, res) =>{ 
        try{res_gen(res, 201, await new productSchema(req.body).save(), "Product added successfully")}
        catch (e) { res_gen(res, 501, e.message, "Cannot add this product") }}

    static list_all_products = async (req, res) => {  
        try{ res_gen(res, 202, await productSchema.find() , "list all Products") }
        catch (e) {res_gen(res, 503, e.message, "Cannot list this Product")}}

    static list_single_product = async (req, res)=>{
        try{ res_gen(res, 202, await productSchema.findById(req.body.id) , "list single Product") }
        catch (e) {res_gen(res, 503, e.message, "Cannot list this Product")}}

    static edit_product = async (req, res) => {
        try{ const product = await productSchema.findById(req.body.id)
              for(let key in req.body){ if(req.body[key]) {product[key] = req.body[key]}}
              res_gen(res, 200, await product.save(), "Product edited successfully")}
        catch(e){res_gen(res, 500, e.message, "Cannot edit this Product")}}

    static delete_product = async (req, res) => {
        try{ res_gen(res, 200, await productSchema.findByIdAndDelete(req.body.id).save(), "Product deleted successfully")}
        catch(e) {res_gen(res, 500, e.message, "cann't delete this product")}}

    static add_comment = async (req, res) => {
        try{ const task = await taskModel.findById(req.body.id)
             res_gen(res, 200, task.comments.push(req.body.comment).save(), "Comment added successfully")}
        catch(e){res_gen(res, 500, e.message, "Cannot add comment")}}
        
    static delete_comment = async (req, res) => {
        try{ const task = await taskModel.findById(req.body.id)
             const index = task.comments.findIndex(comment => comment._id.toString() == req.body.commentid)
             res_gen(res, 200, task.comments.splice(index, 1).save(), "comment deleted successfully")}
        catch(e) {res_gen(res, 500, e.message, "Cannot delete comment")}}


    static edit_comment = async (req, res) => {
        try{
            const task = await taskModel.findById(req.body.id)
            const index = task.comments.findIndex(comment => comment._id.toString() == req.body.commentid)
            task.comments[index] = req.body.comment
            res_gen(res, 200, await task.save(), "comment edited successfully")}
        catch (e){res_gen(res, 500, e.message, "cann't edit comment")}}

}
module.exports = Product

/*   
    # Until NOW ALL USER CAN ADD PRODUCTS => THEN ADMIN ONLY CAN ADD IT  
    # ALL USERS TYPE CAN GET ALL PRODCUTS 
    # make end user and admin can add comment to task
    # make end user cand edit commment from task
*/