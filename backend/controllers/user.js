import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
export const login=async (req, res) => {

    const { email, password } = req.body;
      const isNewUser = await User.findOne({ email });
      if (!isNewUser) {
        return res.status(404).json({ success:false, message: "Account does not found!" });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, isNewUser.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ success:false, message:"Incorrect password. Please try again." });
      }
      const token = jwt.sign({ id: isNewUser._id }, process.env.JWT_SECRET);
      res.status(200).json({ success:true, token, userId: isNewUser._id, username: isNewUser.username,useremail:isNewUser.email,message: "Login successful!" });

  }

  
export const signup=async(req,res)=>{
          const {username,email,password}=req.body;
          const isUserExist=await User.findOne({email});
          if(isUserExist) return res.status(409).json({ success:false, message:"User already exists!"});
          const salt= await bcrypt.genSalt(10);
          const hashedPassword= await bcrypt.hash(password,salt);
          const newUser=await User.create({username,email,password:hashedPassword});
          const jwtToken=jwt.sign({id:newUser._id},"cool",{expiresIn:"1h"});
          return res.status(200).json({success:true, message:"Signup Successfully!",token:jwtToken,username:newUser.username,useremail:newUser.email,userId:newUser._id});
     
  }