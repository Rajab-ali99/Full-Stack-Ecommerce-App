async function allUsers(req,res){
    try {
        
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports =allUsers