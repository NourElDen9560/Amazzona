const productSchema = require("../../database/models/product.model")
const res_gen = require("../helper/methods").res_gen    /* ### LOOK AT NOTES IN END OT FILE ### */
class Product {

    static add_prodcut = async (req, res) => {
        try { res_gen(res, 201, await new productSchema(req.body).save(), "Product added successfully") }
        catch (e) { res_gen(res, 501, e.message, "Cannot add this product") }
    }

    static edit_product = async (req, res) => {
        try {
            const product = await productSchema.findById(req.body.id)
            for (let key in req.body) { if (req.body[key]) { product[key] = req.body[key] } }
            res_gen(res, 200, await product.save(), "Product edited successfully")
        }
        catch (e) { res_gen(res, 500, e.message, "Cannot edit this Product") }
    }

    static delete_product = async (req, res) => {
        try {
            const product = await productSchema.findById(req.body.id)
            if (!product) throw new Error("Product not found")
            await product.remove();
            res_gen(res, 200, req.body.id + " deleted", "Product deleted successfully")
        }
        catch (e) { res_gen(res, 500, e.message, "cann't delete this product") }
    }

    static list_all_products = async (req, res) => {
        try { res_gen(res, 202, await productSchema.find(), "list all Products") }
        catch (e) { res_gen(res, 503, e.message, "Cannot list this Product") }
    }

    static list_single_product = async (req, res) => {
        try {const single = await productSchema.findById(req.body.id)
            if (!single) throw new Error("Product not found")
            res_gen(res, 202, single, "list single Product")}
        catch (e) { res_gen(res, 503, e.message, "Cannot list this Product") }}

    static add_comment = async (req, res) => {
        try {
            const product = await productSchema.findById(req.body.id)
            if (!product) throw new Error("Product not found")
            product.comments.push({ comment: req.body.comment, userId: req.body.userId })
            res_gen(res, 200, await product.save(), "Comment added successfully")}
        catch (e) { res_gen(res, 500, e.message, "Cannot add comment") }}

    static delete_comment = async (req, res) => {
        try {
            const product = await productSchema.findById(req.body.id)
            if(!product) throw new Error("Product not found")
            const index = product.comments.findIndex(comment => comment._id.toString() == req.body.commentid)
            if (index == -1) throw new Error("Comment not found")
            product.comments.splice(index, 1);
            res_gen(res, 200, await product.save(), "comment deleted successfully")}
        catch (e) { res_gen(res, 500, e.message, "Cannot delete comment") }}

    static edit_comment = async (req, res) => {
        try {
            const product = await productSchema.findById(req.body.id)
            if(!product) throw new Error("Product not found")
            const index = product.comments.findIndex(comment => comment._id.toString() == req.body.commentid)
            if(index == -1) throw new Error("Comment not found")
           
            const current_comment = product.comments[index]  

            for (let key in req.body) { if (req.body[key]) { current_comment[key] = req.body[key] } }

            res_gen(res, 200, await product.save(), "comment edited successfully")

        }
        catch (e) { res_gen(res, 500, e.message, "cann't edit comment") }
    }

    static add_rate = async (req, res) => {
        try {
            const product = await productSchema.findById(req.body.id)
            if(!product) throw new Error("Product not found")
            product.rates.push({ rate: req.body.rate, userID: req.body.userID })
            product.save()
            res_gen(res, 200, product, "rate added successfully")}
        catch (e) { res_gen(res, 500, e.message, "Cannot add rate") }}

    static show_rate = async (req, res) => {
        try {
            const product = await productSchema.findById(req.body.id)
            if(!product) throw new Error("Product not found")
            res_gen(res, 200, product.rates, "rate show successfully")}
        catch (e) { res_gen(res, 500, e.message, "Cannot show rate") }}

    static sold_counter_add = async (req, res) => {
        try {
            const product = await productSchema.findById(req.body.id)
            if(!product) throw new Error("Product not found")
            product.sold += 1; product.save()
            res_gen(res, 200, product, "sold counter added successfully")}
        catch (e) { res_gen(res, 500, e.message, "Cannot add sold counter") }}

    static sold_counter_show = async (req, res) => {
        const product = await productSchema.findById(req.body.id);
        if(!product) throw new Error("Product not found")
        try { res_gen(res, 200, product.sold, "sold many times") }
        catch (e) { res_gen(res, 500, e.message, " Not Sell Yet ! ") }}

} module.exports = Product
/*   
    # Until NOW ALL USER CAN ADD PRODUCTS => THEN ADMIN ONLY CAN ADD IT  
    # ALL USERS TYPE CAN GET ALL PRODCUTS 
    # make end user and admin can add comment to task
    # make end user cand edit commment from task
*/