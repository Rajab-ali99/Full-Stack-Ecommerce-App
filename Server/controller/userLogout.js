async function userLogout(req,res){
try {
     res.clearCookie('token')

     res.status(200).json({
        message: 'Logout Successfully',
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
module.exports = userLogout