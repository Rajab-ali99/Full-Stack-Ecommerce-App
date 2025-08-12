const addToCartModel = require("../models/cartProduct")

async function cartProducts(req,res){
    try {
        const currentUser = req.userId
        const products = await addToCartModel.find({
            userId : currentUser
        }).populate('productId')

        res.json({
            data: products,
            success : true,
            error:false,
            message: 'ok'
        })
        
    } catch (error) {
          res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = cartProducts