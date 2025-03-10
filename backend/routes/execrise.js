import express from "express";
import { exerciseInfo,showExercise,addExerciseInfo } from "../controllers/exercise.js";
import wrapAsync from "../utils/wrapAsync.js";
const router=express.Router({mergeParams:true})

router
    .route("/")
    .get(wrapAsync(showExercise))
    
router
    .route("/exercise-info/:id")
    .get(wrapAsync(exerciseInfo))

router 
    .route("/exercise")
    .post(wrapAsync(addExerciseInfo))

export default router;