import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    }
})


const User=mongoose.model("user",userSchema);
export default User;