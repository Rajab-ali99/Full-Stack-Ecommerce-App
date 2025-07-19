const productModel = require("../models/productModel")

async function getProducts(req,res){
    try {
        const products = await productModel.find().sort({createdAt: -1})

        res.json({
            message:"all products",
            data: products,
            error:false,
            success: true
        })
    } catch (error) {
         res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports= getProducts