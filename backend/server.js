import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import ExerciseRoute from "./routes/exercise.js";
import UserRoute from "./routes/user.js";
import CustomError from "./utils/customError.js";
import error from "./controllers/error.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app=express();
const PORT=process.env.PORT || 4000;

connectDB();
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  methods:["GET","POST"],
  credentials:true
}));

app.use(express.json());

app.use("/api/v1",ExerciseRoute);
app.use("/api/v1/user",UserRoute);
app.use("*",(req,res,next)=>{
    const err=new CustomError(404,"Page Not Found!");
    next(err);
})

app.use(error);

app.listen(PORT,(req,res)=>{
    console.log(`server is listing on ${PORT}`);
})

