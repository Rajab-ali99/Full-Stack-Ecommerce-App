const checkUser = require("../helper/checkUser")
const productModel = require("../models/productModel")

async function uploadProduct (req,res){

    try {
        const sessionUser = req.userId
        if(!checkUser(sessionUser)){
           throw new Error('access Denied')
        }
        const product = await new productModel(req.body)
        const saveProduct = await product.save()
        res.status(201).json({
            message: 'Product Uploaded Successfully',
            data: saveProduct,
            success:true,
            error:false
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports =uploadProduct