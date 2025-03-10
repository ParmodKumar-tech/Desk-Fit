import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/deskworker");
        console.log("connected with DB");
    }
    catch(error){
        console.log("Failed to connect!");
    }
    
}
export default connectDB;
