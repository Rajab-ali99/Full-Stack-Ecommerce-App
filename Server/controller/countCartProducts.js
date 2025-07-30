const addProductToCart = require("./addProductToCart")

async function countCartProducts(req,res){
    try {
        const userId = req.userId
        const count = await addProductToCart.countDocuments({userId})
        res.json({
            message:'ok',
            success:true,
            error:false,
            data:count
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