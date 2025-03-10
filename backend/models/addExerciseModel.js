import mongoose from "mongoose";

const addExerciseSchema=mongoose.Schema({
    name:{type:String, required:[true,"name is required field!"]},
    duration:{type:String, required:[true,"duration is required field!"]},
    gifAnimation:String,
    url:String,
    instructions:[],
    focusArea:[],
    commonMistakes:[],
    breathingTips:[]
})

const Exercise=mongoose.model("exercise",addExerciseSchema);
export default Exercise;