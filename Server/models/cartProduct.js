const mongoose = require('mongoose')
const addProductToCart = new mongoose.Schema({
    productId: {
        ref : 'product',
        type : String
    },
    quantity: Number,
    userId: String
}, {
    timestamps: true
})
const addToCartModel = mongoose.model('Cart Products', addProductToCart)

module.exports = addToCartModel