const addToCartModel = require("../models/cartProduct")

async function increaseQuantity (req,res){
    try {
        const productId = req.body._id
        const qty = req.body.quantity
        const updateProduct = await addToCartModel.updateOne({_id:productId},{
            quantity: qty
        })
        res.json({
            message:'updated quantity',
            success:true,
            error:false,
            data:updateProduct
        })

    } catch (error) {
         res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = increaseQuantity