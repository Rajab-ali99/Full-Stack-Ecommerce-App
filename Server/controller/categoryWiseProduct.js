const productModel = require("../models/productModel")

async function CategoryWiseProduct (req,res){
    try {
        const {category} = req.body || req?.querry
        const product = await productModel.find({category})
        res.json({
            data: product,
            message: 'products fetched',
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
module.exports = CategoryWiseProduct