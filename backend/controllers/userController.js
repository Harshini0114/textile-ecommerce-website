import validator from 'validator';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: 24*60*60})
}


// user login
const loginUser=async(req,res)=>{
    try{
        const {email, password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({sucees:false, message:"user not found"})
        }
        const isMatch=await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.json({success:false, message:"invalid password"})
            
        }
        else{
            const token=createToken(user._id)
            res.json({success:true, token})
        }

    }catch(err){
        console.log(err)
        return res.json({success:false, message:err.message})
    }
    
}

// user registration
const registerUser=async(req,res)=>{
    try{
        const {name, email, password}= req.body;
        const exists =await userModel.findOne({email})
        if (exists){
            return res.json({success:false, message: "user already exists"})
        }
        if (!validator.isEmail(email)){
            return res.json({success:false, message: "invalid email"})
        }
        if (password.length<8){
            return res.json({success:false, message:"password should be atleast 8 characters"}) 
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password, salt)

        const newUser= new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user=await newUser.save()
        const token=createToken(user._id)
        res.json({success:true, token})
        
    }catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

// admin login
const adminLogin=async(req,res)=>{
    try{
        const {email, password}=req.body
        if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=createToken(email+password, process.env.JWT_SECRET, {expiresIn: 24*60*60})
            console.log(token)
            res.json({success:true, token})
        }
        else{
            res.json({success:false, message:"invalid credentials"})
        }
        
    }catch(err){
        res.json({success:false, message:err.message})
    }
}

export {registerUser, loginUser, adminLogin}