const addToCartModel = require("../models/cartProduct")
const addProductToCart = require("./addProductToCart")

async function countCartProducts(req,res){
    try {
        const userId = req.userId
        const count = await addToCartModel.countDocuments({userId})
        res.json({
            message:'ok',
            success:true,
            error:false,
            data:{
                count: count
            }
        })
    } catch (error) {
           res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}
module.exports = countCartProducts