import mongoose from "mongoose";

const addExerciseSchema=mongoose.Schema({
    name:{
        type:String, 
        required:[true,"name is required field!"]
    },
    duration:{
        type:String, 
        required:[true,"duration is required field!"]
    },
    gifAnimation:{
        type:String
    },
    url:{
        type:String
    },
    instructions:[String],
    focusArea:[String],
    commonMistakes:[String],
    breathingTips:[String]
})

const Exercise=mongoose.model("exercise",addExerciseSchema);
export default Exercise;