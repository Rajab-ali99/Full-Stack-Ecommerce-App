const userModel = require("../models/userModel")

async function allUsers(req,res){
    try {
         const users = await userModel.find() 
         res.json({
            message: 'All users are here',
            data: users,
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
module.exports =allUsers