const jwt = require('jsonwebtoken')
async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token
        if (!token) {
            res.json({
                message: "user not Login",
                success: false,
                error: true
            })
        }else{

            jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
               if(err){
                console.log('auth Error',err)
               }
               req.userId = decoded?._id
               next()
            });
        }


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}
module.exports =authToken