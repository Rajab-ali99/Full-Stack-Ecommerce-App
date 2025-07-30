const productModel = require("../models/productModel")

async function getproductByCategory(req,res) {
    try {
        const productCategory = await productModel.distinct('category')
        const productByCategory = []
        for(const category of productCategory){
            const product = await productModel.findOne({category})
            productByCategory.push(product)
        }
        res.status(200).json({
            message: 'products fetch',
            data: productByCategory,
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

module.exports = getproductByCategory