const productModel = require("../models/productModel")

async function searchProducts (req,res){
    try {
        const querry = req.query.q
        const regex = new RegExp(querry,'ig')
        const products = await productModel.find({
            "$or":[
                {
                    productName: regex
                },
                {
                   category: regex 
                }
            ]
        })

        res.json({
            message : 'ok',
            success:true,
            error:false,
            data:products
        })
    } catch (error) {
         res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = searchProducts