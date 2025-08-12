const productModel = require("../models/productModel")

async function FilterProducts (req,res){
    try {
        const arrayOfCategory = req.body.category || []
        const products = await productModel.find({
            category : {
                '$in':arrayOfCategory
            }
        })

        res.json({
            data: products,
            message : 'fetched',
            error: false,
            success:true
        })
    } catch (error) {
          res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = FilterProducts