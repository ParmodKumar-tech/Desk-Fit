import mongoose from "mongoose";
import "dotenv/config";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.ATLASDB_URL);
        console.log("connected with DB");
    }
    catch(error){
        console.log("Failed to connect! "+error);
    }
    
}
export default connectDB;
