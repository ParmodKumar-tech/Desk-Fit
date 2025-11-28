import Exercise from "../models/addExerciseModel.js";
import CustomError from "../utils/customError.js";

export const showExercise=async(req,res)=>{
    const exercises=await Exercise.find();
    if(exercises.length===0){
        return res.status(200).json({ success: false, message:"Exercise not avaliable."});   
    }
    res.status(200).json({ success: true, data: exercises });   
}

export const exerciseInfo=async(req,res)=>{
        let {id}=req.params;
        
        const exerciseInfo=await Exercise.findOne({_id:id});
        if(!exerciseInfo){
            const error=new CustomError(404,"Exercise not found!")
            return next(error);
        }
        res.status(200).json({success:true, data:exerciseInfo});   
}

export const addExerciseInfo=async(req,res)=>{
    const addExerciseInfo=await Exercise.create({...req.body});
    
    res.status(200).json({success:true,message:"Exercise added successfully"});
}