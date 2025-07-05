const userModel = require("../models/userModel")

async function userDetails(req,res){
try {
    const userId = req.userId
    const user = await userModel.findById(userId)
    console.log('user',user)

    res.status(200).json({
        data: user,
        message: 'User Details',
        error:false,
        success:true
    })
} catch (error) {
    res.status(400).json({
        message: error.message || error,
        success: false,
        error:true
    })
}
}

module.exports =userDetails