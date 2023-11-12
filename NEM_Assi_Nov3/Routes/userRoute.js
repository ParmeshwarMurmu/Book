const express = require('express');
const { UserModel } = require('../Model/UserSchema');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
require('dotenv').config()

const userRoute = express.Router()

userRoute.use(cookieParser())


userRoute.post('/register', async(req, res)=>{

    const {email, password} = req.body;



    try {

        const existingUser = await UserModel.findOne({email})
    

        if(existingUser){
            res.status(200).send({"msg": "User Already Exists"})
        }
        else{

        bcrypt.hash(password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                res.status(200).send({"msg": "Please Login"})
            }

            const user = new UserModel({...req.body, password: hash})
            await user.save();
            
            res.status(200).send({"msg": "Registered successfully"})
            

        });
    }

    } catch (error) {
        res.status(400).send({"msg": "error", "err": error})
    }
})

userRoute.post('/login', async(req, res)=>{

    const {email, password} = req.body;

    try {

        const existingUser = await UserModel.findOne({email})

        if(existingUser){
         
            bcrypt.compare(password, existingUser.password, (err, result)=> {
                // result == true
                if(result){
                 const token = jwt.sign({userName: existingUser.name, userId: existingUser._id}, process.env.secretKey);
                 res.cookie('token', token, { httpOnly: true, secure: true });
                 res.status(200).send({"msg": "Login Success", "token": token})
                }
            });


        }

        
    } catch (error) {
        
    }
})





module.exports = {
    userRoute
}