
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name :String,
    email: {
        type : String,
        required: true,
        unique: true
    },
    profilePic: String,
    password: String
},{
    timestamps: true
})
const userModel = mongoose.model('user',userSchema)

module.exports = userModel