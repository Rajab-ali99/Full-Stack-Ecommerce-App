const userModel = require("../models/userModel")
async function updateUser(req,res){
try {
    console.log('req',req.body)
    const {userId,email ,name,ROLE} = req.body
    const payload ={
        ...(email &&{email:email}),
        ...(name &&{name:name}),
        ...(ROLE &&{ROLE:ROLE}),
    }
        const updateUser = await userModel.findByIdAndUpdate(userId,payload)
    
    res.json({
        data: updateUser,
        success:true,
        error:false,
        message:'User updated'
    })
} catch (error) {
     res.json({
            message: error.message || error,
            error: true,
            success: false
        })
}
}
module.exports = updateUser