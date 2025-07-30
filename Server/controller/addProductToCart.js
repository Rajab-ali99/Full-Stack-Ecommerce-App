const addToCartModel = require("../models/cartProduct")

async function addProductToCart(req, res) {
    try {
        const { productId } = req.body
        const alreadyAvailableProduct = await addToCartModel.findOne({productId})
        if(alreadyAvailableProduct){
            res.json({
                message : 'Product already available in cart',
                success: false,
                error:true
            })
        }
        const requsetedUser = req.userId
        const payload = {
            productId: productId,
            quantity: 1,
            userId: requsetedUser
        }
        const product = new addToCartModel(payload)
        const saveProduct = await product.save()
        res.json({
            message:'Product added to Cart',
            success:true,
            error:false,
            data:saveProduct
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports= addProductToCart