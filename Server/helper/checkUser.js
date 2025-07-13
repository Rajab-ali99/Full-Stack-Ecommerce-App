const userModel = require("../models/userModel")

const checkUser =async (userId)=>{
    const user = await userModel.findById(userId)
    if(user.ROLE !== 'ADMIN'){
        return false
    }
    return true
}
module.exports = checkUser