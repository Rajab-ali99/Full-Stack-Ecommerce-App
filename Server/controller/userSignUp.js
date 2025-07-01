const userModel = require("../models/userModel")
 const bcrypt = require('bcryptjs')
async function userSignUpController(req, res) {
    try {
        const { name, email, password } = req.body
        const checkUser = await userModel.findOne({email})
        if (checkUser) {
            throw new Error('User Already Exist')
        }
        if (!email) {
            throw new Error('Please proide email')
        }
        if (!name) {
            throw new Error('Please proide name')
        }
        if (!password) {
            throw new Error('Please proide password')
        }
       

        const salt = bcrypt.genSaltSync(10);
        const hashPassword =  bcrypt.hashSync(password, salt);
         if (!hashPassword) {
            throw new Error('Security problem')
        }
        const payload = {
            ...req.body,
            password : hashPassword
        }

        const userData =  new userModel(payload)
        const saveData= await userData.save()
        res.status(201).json({
            message: 'User created successfully',
            data: saveData,
            error: false,
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message,
            error: true,
            success: false
        })
    }
}
module.exports= userSignUpController