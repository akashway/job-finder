const express= require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const User=require('../schema/user.schema')
const app=express()


router.post("/register",async (req,res)=>{
    const {name,email,mobile,password}= req.body

    const isUserExits=await User.findOne({email})
    if(isUserExits){
        res.status(400).json({message:"User already exists"})
    }
    else{
        const salt= await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(password,salt)

        try{
            const user= await User.create({
                name,
                email,
                mobile,
                password:hashPassword
            })

            res.status(200).json({message:"User created"})
        }
        catch(err){
            res.status(500).json({message:"error in creating user"})
        }
    }

})


router.post("/login",async (req,res)=>{
    const {email,password}=req.body

    const isValidUser=await User.findOne({email})

    if(!isValidUser){
        res.status(400).json({message:"Wrong email or password"})
    }
    else{
        const isPasswordCorrect= await bcrypt.compare(password,isValidUser.password)
        if(!isPasswordCorrect){
            res.status(400).json({message:"Wrong password"})
        }
        else{
            const payload={
                id:isValidUser._id
            }
    
            const token=jwt.sign(payload,process.env.JWT_SECRET)
            res.status(200).json({token})
        }
    }
})


module.exports=router