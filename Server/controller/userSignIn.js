const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
async function userSignInController(req, res) {
    try {

        const { email, password } = req.body
        const checkUser = await userModel.findOne({ email })
        if (!email) {
            throw new Error('Please proide email')
        }
        if (!password) {
            throw new Error('Please provide password')
        }
        if (!checkUser) {
            throw new Error('User not exist')
        }
        const checkpassword = await bcrypt.compare(password, checkUser.password)
        if (checkpassword) {
            const tokenData ={
                _id: checkUser._id,
                email: checkUser.email
            }
            const token =await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            const tokenOptons={
                httpOnly : true,
                secure : true
            }

            res.cookie("token",token,tokenOptons).status(200).json({
                message:"Login successfully",
                data: token,
                success:true,
                error:false,
            })
            
        }else{
            throw new Error("please check Password")
        }

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

module.exports = userSignInController