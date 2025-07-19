const checkUser = require("../helper/checkUser")
const productModel = require("../models/productModel")

async function updateProduct (req,res){
    try {
        if(!checkUser(req.userId)){
           throw new Error('access Denied')
        }
        const {_id, ...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
        res.json({
            message: 'Product updated Sccesfully',
            data: updateProduct,
            success: true,
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
module.exports = updateProduct