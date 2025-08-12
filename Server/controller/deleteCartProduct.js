const addToCartModel = require("../models/cartProduct")

async function deleteCartProduct (req,res){
    try {
        const productId = req.body._id
        const deleteProduct =await addToCartModel.deleteOne({_id:productId})
        res.json({
            message:'Product removed from cart',
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
module.exports = deleteCartProduct